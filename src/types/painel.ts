export type Belt =
  | 'branca'
  | 'cinza'
  | 'amarela'
  | 'laranja'
  | 'verde'
  | 'azul'
  | 'roxa'
  | 'marrom'
  | 'preta';

export const BELT_COLORS: Record<Belt, string> = {
  branca: '#F5F5F0',
  cinza: '#9CA3AF',
  amarela: '#EAB308',
  laranja: '#F97316',
  verde: '#22C55E',
  azul: '#2563EB',
  roxa: '#7C3AED',
  marrom: '#92400E',
  preta: '#1A1A1A',
};

export const BELT_LABELS: Record<Belt, string> = {
  branca: 'Branca',
  cinza: 'Cinza',
  amarela: 'Amarela',
  laranja: 'Laranja',
  verde: 'Verde',
  azul: 'Azul',
  roxa: 'Roxa',
  marrom: 'Marrom',
  preta: 'Preta',
};

export const BELTS_ORDER: Belt[] = [
  'branca', 'cinza', 'amarela', 'laranja', 'verde',
  'azul', 'roxa', 'marrom', 'preta',
];

export type Modality = 'bjj-adultos' | 'bjj-kids' | 'defesa-pessoal' | 'open-mat';
export const MODALITY_LABELS: Record<Modality, string> = {
  'bjj-adultos': 'BJJ Adultos',
  'bjj-kids': 'BJJ Kids',
  'defesa-pessoal': 'Defesa Pessoal',
  'open-mat': 'Open Mat',
};

export const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  belt: Belt;
  stripes: number;
  planId: string;
  enrollmentDate: string;
  active: boolean;
  notes: string;
}

export interface GraduationRule {
  id: string;
  fromBelt: Belt;
  toBelt: Belt;
  minMonths: number;
  minClasses: number;
  requirements: string;
  notes: string;
}

export interface ClassSchedule {
  id: string;
  dayOfWeek: number;
  time: string;
  duration: number;
  modality: Modality;
  instructor: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  frequency: 'mensal' | 'trimestral' | 'semestral' | 'anual';
  description: string;
  active: boolean;
}

export type PaymentStatus = 'pendente' | 'pago' | 'atrasado';

export interface Payment {
  id: string;
  studentId: string;
  planId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  notes: string;
}
