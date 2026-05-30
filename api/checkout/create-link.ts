import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// ── Rate limiting (in-memory, resets on cold start) ──────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 10) return true;
  entry.count += 1;
  return false;
}

// ── Server-side pricing (never trust the client) ─────────────────────────────
const MATRICULA_FEE = 50; // R$ per person

const MONTHLY_PRICES: Record<string, Record<string, number>> = {
  kids: {
    '1x': 179,
    '3x': 229,
    '5x': 279,
  },
  adulto: {
    anual: 199,      // × 12 = R$2.388 total
    recorrente: 229,
    mensal: 279,
  },
};

function familyMonthly(people: number): number {
  if (people <= 2) return 389;
  if (people === 3) return 499;
  return 499 + (people - 3) * 119;
}

// ── Input validation schema ───────────────────────────────────────────────────
const bodySchema = z.discriminatedUnion('planType', [
  z.object({
    planType: z.literal('kids'),
    planVariant: z.enum(['1x', '3x', '5x']),
  }),
  z.object({
    planType: z.literal('adulto'),
    planVariant: z.enum(['anual', 'recorrente', 'mensal']),
  }),
  z.object({
    planType: z.literal('familia'),
    planVariant: z.literal('anual'),
    numberOfPeople: z.number().int().min(2).max(5),
  }),
]);

// ── Asaas payment link payload builder ───────────────────────────────────────
type AsaasPayload = {
  name: string;
  description: string;
  billingType: 'UNDEFINED';
  chargeType: 'RECURRENT' | 'DETACHED';
  value: number;
  subscriptionCycle?: 'MONTHLY';
  maxInstallmentCount?: number;
  dueDateLimitDays?: number;
};

function buildPayload(
  body: z.infer<typeof bodySchema>
): AsaasPayload {
  const returnBase = process.env.SITE_URL ?? '';

  if (body.planType === 'kids') {
    const monthly = MONTHLY_PRICES.kids[body.planVariant];
    const planLabels: Record<string, string> = {
      '1x': 'Kids I — 1x por semana',
      '3x': 'Kids II — até 3x por semana',
      '5x': 'Kids Full — 5x por semana',
    };
    return {
      name: `BLACKBOX Jiu-Jitsu — ${planLabels[body.planVariant]}`,
      description: `Matrícula R$${MATRICULA_FEE} + Mensalidade R$${monthly}/mês`,
      billingType: 'UNDEFINED',
      chargeType: 'RECURRENT',
      value: monthly + MATRICULA_FEE, // first charge includes matrícula fee
      subscriptionCycle: 'MONTHLY',
    };
  }

  if (body.planType === 'adulto') {
    if (body.planVariant === 'anual') {
      const total = 199 * 12 + MATRICULA_FEE;
      return {
        name: 'BLACKBOX Jiu-Jitsu — Adulto Anual',
        description: `Plano anual R$199/mês × 12 + Matrícula R$${MATRICULA_FEE} (total R$${total})`,
        billingType: 'UNDEFINED',
        chargeType: 'DETACHED',
        value: total,
        maxInstallmentCount: 12,
      };
    }
    if (body.planVariant === 'recorrente') {
      return {
        name: 'BLACKBOX Jiu-Jitsu — Adulto Recorrente',
        description: `Matrícula R$${MATRICULA_FEE} + Mensalidade R$229/mês`,
        billingType: 'UNDEFINED',
        chargeType: 'RECURRENT',
        value: 229 + MATRICULA_FEE,
        subscriptionCycle: 'MONTHLY',
      };
    }
    // mensal
    return {
      name: 'BLACKBOX Jiu-Jitsu — Adulto Mensal',
      description: `Matrícula R$${MATRICULA_FEE} + 1 mês R$279`,
      billingType: 'UNDEFINED',
      chargeType: 'DETACHED',
      value: 279 + MATRICULA_FEE,
      dueDateLimitDays: 5,
    };
  }

  // família
  const n = body.numberOfPeople;
  const monthly = familyMonthly(n);
  const totalMatricula = MATRICULA_FEE * n;
  const annualTotal = monthly * 12 + totalMatricula;
  return {
    name: `BLACKBOX Jiu-Jitsu — Família (${n} pessoas)`,
    description: `Plano Família Anual ${n} pessoas — R$${monthly}/mês × 12 + Matrículas R$${totalMatricula} (total R$${annualTotal})`,
    billingType: 'UNDEFINED',
    chargeType: 'DETACHED',
    value: annualTotal,
    maxInstallmentCount: 12,
  };
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? '';
  const origin = req.headers.origin ?? '';
  if (allowedOrigin && origin !== allowedOrigin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ??
    'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  // Validate input
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error.flatten() });
  }

  const apiKey = process.env.ASAAS_API_KEY;
  const baseUrl = process.env.ASAAS_BASE_URL ?? 'https://sandbox.asaas.com/api/v3';
  const siteUrl = process.env.SITE_URL ?? '';

  if (!apiKey) {
    return res.status(500).json({ error: 'Payment service not configured' });
  }

  const payload = buildPayload(parsed.data);
  const asaasBody = {
    ...payload,
    returnUrl: `${siteUrl}/matricula/confirmado`,
  };

  try {
    const asaasRes = await fetch(`${baseUrl}/paymentLinks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: apiKey,
      },
      body: JSON.stringify(asaasBody),
    });

    if (!asaasRes.ok) {
      const errBody = await asaasRes.text();
      console.error('Asaas error:', asaasRes.status, errBody);
      return res.status(502).json({ error: 'Payment provider error' });
    }

    const data = (await asaasRes.json()) as { url?: string };
    if (!data.url) {
      return res.status(502).json({ error: 'No payment URL returned' });
    }

    // Return only the URL — never relay full Asaas response to client
    return res.status(200).json({ url: data.url });
  } catch (err) {
    console.error('create-link error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
