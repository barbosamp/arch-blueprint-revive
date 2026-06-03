"""
Gera o contrato BLACKBOX JIU-JITSU em PDF.
Uso: python3 scripts/generate-contract.py
Saída: public/contrato-blackbox-bjj.pdf
"""

import os
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, PageBreak
)
from reportlab.platypus.flowables import KeepTogether
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Fonts ─────────────────────────────────────────────────────────────────────
FONT_REG  = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
FONT_IT   = '/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf'

pdfmetrics.registerFont(TTFont('Sans',     FONT_REG))
pdfmetrics.registerFont(TTFont('Sans-B',   FONT_BOLD))
pdfmetrics.registerFont(TTFont('Sans-I',   FONT_IT))

# ── Colors ────────────────────────────────────────────────────────────────────
BLACK  = colors.HexColor('#000000')
GOLD   = colors.HexColor('#E6BB55')
GOLD_L = colors.HexColor('#F5DFA0')
DARK   = colors.HexColor('#1A1A1A')
GRAY   = colors.HexColor('#555555')
LGRAY  = colors.HexColor('#AAAAAA')
WHITE  = colors.white

# ── Styles ────────────────────────────────────────────────────────────────────
def make_styles():
    s = {}
    base = dict(fontName='Sans', fontSize=9, leading=14, textColor=DARK,
                spaceAfter=4, spaceBefore=0, alignment=TA_JUSTIFY)

    s['body']    = ParagraphStyle('body', **base)
    s['body_sm'] = ParagraphStyle('body_sm', **{**base, 'fontSize': 8, 'leading': 12})
    s['bold']    = ParagraphStyle('bold',  **{**base, 'fontName': 'Sans-B'})
    s['italic']  = ParagraphStyle('italic', **{**base, 'fontName': 'Sans-I', 'textColor': GRAY})
    s['clause']  = ParagraphStyle('clause', fontName='Sans-B', fontSize=8.5,
                                  leading=13, textColor=BLACK, spaceBefore=14,
                                  spaceAfter=4, alignment=TA_LEFT,
                                  borderPad=0)
    s['sub']     = ParagraphStyle('sub', fontName='Sans-B', fontSize=8,
                                  leading=12, textColor=GRAY, spaceBefore=6,
                                  spaceAfter=2, alignment=TA_LEFT)
    s['bullet']  = ParagraphStyle('bullet', **{**base, 'leftIndent': 14,
                                   'firstLineIndent': -9, 'bulletIndent': 0})
    s['footer']  = ParagraphStyle('footer', fontName='Sans', fontSize=7,
                                  leading=10, textColor=LGRAY, alignment=TA_CENTER)
    s['parq_q']  = ParagraphStyle('parq_q', fontName='Sans', fontSize=8.5,
                                  leading=13, textColor=DARK, spaceAfter=2,
                                  spaceBefore=0, alignment=TA_JUSTIFY,
                                  leftIndent=16, firstLineIndent=-16)
    return s


# ── Header / Footer ───────────────────────────────────────────────────────────
def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4

    # Top bar
    canvas.setFillColor(BLACK)
    canvas.rect(0, h - 2*cm, w, 2*cm, fill=1, stroke=0)

    # Brand
    canvas.setFillColor(WHITE)
    canvas.setFont('Sans-B', 18)
    canvas.drawString(2*cm, h - 1.28*cm, 'BLACKBOX')
    canvas.setFillColor(GOLD)
    canvas.drawString(2*cm + canvas.stringWidth('BLACKBOX', 'Sans-B', 18), h - 1.28*cm, '.')
    canvas.setFillColor(LGRAY)
    canvas.setFont('Sans', 7)
    canvas.drawString(2*cm, h - 1.65*cm, 'JIU-JITSU  ·  CAJAMAR & SANTANA DE PARNAÍBA, SP')

    # Right side: doc label
    canvas.setFillColor(GOLD)
    canvas.setFont('Sans-B', 7)
    right_text = 'CONTRATO DE MATRÍCULA'
    canvas.drawRightString(w - 2*cm, h - 1.1*cm, right_text)
    canvas.setFillColor(LGRAY)
    canvas.setFont('Sans', 7)
    canvas.drawRightString(w - 2*cm, h - 1.55*cm, 'CNPJ 46.383.547/0001-14')

    # Gold accent line
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(1.5)
    canvas.line(0, h - 2*cm, w, h - 2*cm)

    # Footer
    canvas.setStrokeColor(colors.HexColor('#DDDDDD'))
    canvas.setLineWidth(0.5)
    canvas.line(2*cm, 1.5*cm, w - 2*cm, 1.5*cm)
    canvas.setFillColor(LGRAY)
    canvas.setFont('Sans', 6.5)
    canvas.drawString(2*cm, 1.1*cm,
        'Blackbox Jiu-Jitsu · CNPJ 46.383.547/0001-14 · R. Waldemar Meira, 665 — Portais, Cajamar/SP')
    canvas.drawRightString(w - 2*cm, 1.1*cm, f'Pág. {doc.page}')

    canvas.restoreState()


# ── Bullet helper ─────────────────────────────────────────────────────────────
def bullet(text, style):
    return Paragraph(f'<bullet bulletIndent="0" bulletFontName="Sans" bulletFontSize="9">•</bullet> {text}', style)


# ── Build document ─────────────────────────────────────────────────────────────
def build_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=2*cm, rightMargin=2*cm,
        topMargin=2.8*cm, bottomMargin=2.2*cm,
        title='Contrato de Matrícula — Blackbox Jiu-Jitsu',
        author='Blackbox Jiu-Jitsu',
        subject='Contrato de Prestação de Serviços Educacionais em Artes Marciais',
    )

    S = make_styles()
    story = []

    # ── Contract title ─────────────────────────────────────────────────────────
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph(
        'CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS EM ARTES MARCIAIS',
        ParagraphStyle('title', fontName='Sans-B', fontSize=14, leading=18,
                       textColor=BLACK, spaceAfter=6, alignment=TA_CENTER)
    ))
    story.append(HRFlowable(width='100%', thickness=1.5, color=GOLD, spaceAfter=10))

    # ── Preamble ──────────────────────────────────────────────────────────────
    story.append(Paragraph(
        'Pelo presente instrumento particular, de um lado a '
        '<b>BLACKBOX JIU-JITSU</b>, inscrita no CNPJ sob o nº '
        '<b>46.383.547/0001-14</b>, com sede na '
        '<b>Rua Waldemar Meira, nº 665, Bairro Portais, Cajamar — SP</b>, '
        'neste ato representada por seu responsável técnico, '
        '<b>Sr. Jacson Ferreira da Silva Junior</b>, portador do CREF nº 199627-G/SP, '
        'doravante denominada <b>CONTRATADA</b>, e de outro lado o <b>ALUNO</b> ou seu '
        '<b>RESPONSÁVEL LEGAL</b> (quando menor de idade), cujos dados são fornecidos '
        'no momento da matrícula digital, doravante denominado <b>CONTRATANTE</b>, '
        'têm entre si justo e contratado o que segue:',
        S['body']
    ))

    # ── Clause helper ─────────────────────────────────────────────────────────
    def cl(num, title):
        return [
            Spacer(1, 0.1*cm),
            HRFlowable(width='100%', thickness=0.3, color=colors.HexColor('#DDDDDD'),
                       spaceAfter=4),
            Paragraph(f'CLÁUSULA {num.upper()} — {title.upper()}', S['clause']),
        ]

    # ── Clause 1 ──────────────────────────────────────────────────────────────
    story += cl('primeira', 'Do Objeto')
    story.append(Paragraph(
        '1.1. O presente contrato tem por objeto a prestação de serviços educacionais '
        'de ensino da arte marcial Jiu-Jitsu, nas seguintes modalidades:', S['body']))
    story.append(bullet('Turmas regulares coletivas;', S['bullet']))
    story.append(bullet('Aulas personalizadas (individuais).', S['bullet']))
    story.append(Paragraph(
        '1.2. A modalidade contratada será selecionada pelo CONTRATANTE no ato da matrícula '
        'digital, de acordo com as opções disponíveis no site oficial da CONTRATADA.', S['body']))

    # ── Clause 2 ──────────────────────────────────────────────────────────────
    story += cl('segunda', 'Dos Planos e Valores')

    # Pricing table
    plan_data = [
        # Header
        [Paragraph('<b>PLANO</b>', S['bold']),
         Paragraph('<b>DESCRIÇÃO</b>', S['bold']),
         Paragraph('<b>VALOR</b>', S['bold'])],
        # Kids
        [Paragraph('Kids I', S['body']),
         Paragraph('4 a 6 anos · 1× por semana', S['body']),
         Paragraph('R$ 179,00/mês', S['body'])],
        [Paragraph('Kids II', S['body']),
         Paragraph('6 a 12 anos · Até 3× por semana', S['body']),
         Paragraph('R$ 229,00/mês', S['body'])],
        [Paragraph('Kids Full', S['body']),
         Paragraph('Acesso diário · todas as idades', S['body']),
         Paragraph('R$ 279,00/mês', S['body'])],
        # Família
        [Paragraph('Família — 2 pessoas', S['body']),
         Paragraph('Acesso diário · plano anual', S['body']),
         Paragraph('R$ 389,00/mês', S['body'])],
        [Paragraph('Família — 3 pessoas', S['body']),
         Paragraph('Acesso diário · plano anual', S['body']),
         Paragraph('R$ 499,00/mês', S['body'])],
        # Adulto
        [Paragraph('Adulto — Anual', S['body']),
         Paragraph('Cartão até 12× · melhor valor', S['body']),
         Paragraph('R$ 2.388,00/ano\n(R$ 199,00/mês)', S['body_sm'])],
        [Paragraph('Adulto — Recorrente', S['body']),
         Paragraph('Débito automático mensal', S['body']),
         Paragraph('R$ 229,00/mês', S['body'])],
        [Paragraph('Adulto — Mensal', S['body']),
         Paragraph('Sem compromisso', S['body']),
         Paragraph('R$ 279,00', S['body'])],
        # Personal Kids
        [Paragraph('Personal Kids — 1×/sem', S['body']),
         Paragraph('45 min por sessão', S['body']),
         Paragraph('R$ 300,00/mês', S['body'])],
        [Paragraph('Personal Kids — 2×/sem', S['body']),
         Paragraph('45 min por sessão', S['body']),
         Paragraph('R$ 450,00/mês', S['body'])],
        # Matrícula
        [Paragraph('<b>Taxa de matrícula</b>', S['bold']),
         Paragraph('Única · por aluno', S['body']),
         Paragraph('<b>R$ 50,00</b>', S['bold'])],
    ]

    col_w = [4.5*cm, 7.5*cm, 3.5*cm]
    tbl = Table(plan_data, colWidths=col_w, repeatRows=1)
    tbl.setStyle(TableStyle([
        ('BACKGROUND',  (0,0), (-1,0), BLACK),
        ('TEXTCOLOR',   (0,0), (-1,0), GOLD),
        ('FONTNAME',    (0,0), (-1,0), 'Sans-B'),
        ('FONTSIZE',    (0,0), (-1,0), 8),
        ('ROWBACKGROUNDS', (0,1), (-1,-2), [WHITE, colors.HexColor('#F8F8F8')]),
        ('BACKGROUND',  (0,-1), (-1,-1), colors.HexColor('#FFF8E7')),
        ('GRID',        (0,0), (-1,-1), 0.3, colors.HexColor('#CCCCCC')),
        ('LEFTPADDING',  (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING',   (0,0), (-1,-1), 4),
        ('BOTTOMPADDING',(0,0), (-1,-1), 4),
        ('VALIGN',      (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(Spacer(1, 0.2*cm))
    story.append(tbl)
    story.append(Spacer(1, 0.15*cm))
    story.append(Paragraph(
        '<b>Formas de pagamento:</b> PIX, cartão de crédito ou dinheiro.', S['body']))

    # ── Clause 3 ──────────────────────────────────────────────────────────────
    story += cl('terceira', 'Do Reajuste')
    story.append(Paragraph(
        '3.1. Os valores serão reajustados anualmente a partir de 15 de fevereiro de 2026, '
        'conforme o IPCA e os custos operacionais.', S['body']))
    story.append(Paragraph(
        '3.2. Alunos adimplentes mantêm o valor anterior por até 12 (doze) meses após o reajuste.',
        S['body']))

    # ── Clause 4 ──────────────────────────────────────────────────────────────
    story += cl('quarta', 'Das Obrigações do Contratante')
    story.append(Paragraph('O CONTRATANTE se compromete a:', S['body']))
    story.append(bullet('Cumprir o regulamento interno da CONTRATADA;', S['bullet']))
    story.append(bullet(
        'Utilizar uniforme oficial <b>BLACKBOX JIU-JITSU</b> (kimono e No-Gi) em até '
        '6 meses após a matrícula;', S['bullet']))
    story.append(bullet('Apresentar atestado médico ou preencher o PAR-Q (Anexo I);', S['bullet']))
    story.append(bullet(
        'Manter os pagamentos em dia, inclusive em caso de ausência sem justificativa.',
        S['bullet']))

    # ── Clause 5 ──────────────────────────────────────────────────────────────
    story += cl('quinta', 'Do PAR-Q e Aptidão Física')
    story.append(Paragraph(
        '5.1. O CONTRATANTE declara que o aluno encontra-se em plenas condições físicas e '
        'mentais para a prática de atividades físicas, conforme as respostas fornecidas ao PAR-Q.',
        S['body']))
    story.append(Paragraph(
        '5.2. A CONTRATADA se exime de responsabilidade por informações de saúde omitidas '
        'ou por condições preexistentes não comunicadas.', S['body']))

    # ── Clause 6 ──────────────────────────────────────────────────────────────
    story += cl('sexta', 'Da Suspensão, Cancelamento e Reposições')
    story.append(Paragraph('<b>6.1. Aulas Personalizadas</b>', S['sub']))
    story.append(Paragraph(
        '6.1.1. Permitida 1 reposição por mês, com aviso mínimo de 12 horas.', S['body']))
    story.append(Paragraph(
        '6.1.2. Reposição com menos de 12h dependerá de acordo entre as partes.', S['body']))
    story.append(Paragraph('<b>6.2. Planos Regulares</b>', S['sub']))
    story.append(Paragraph(
        '6.2.1. Após 8 meses, pode-se congelar o plano por até 30 dias, com aviso de '
        '5 dias úteis.', S['body']))
    story.append(Paragraph(
        '6.2.2. Cancelamento sem multa exige atestado médico de incapacidade definitiva.',
        S['body']))
    story.append(Paragraph(
        '6.2.3. Cancelamento sem aviso prévio de 30 dias sujeita o CONTRATANTE à multa '
        'equivalente a 1 (uma) mensalidade vigente.', S['body']))
    story.append(Paragraph(
        '<b>6.3.</b> Ausência não justifica inadimplência.', S['body']))

    # ── Clause 7 ──────────────────────────────────────────────────────────────
    story += cl('sétima', 'Do Uso de Imagem')
    story.append(Paragraph(
        '7.1. O CONTRATANTE autoriza o uso gratuito da imagem, nome e voz do aluno para '
        'fins institucionais e promocionais da BLACKBOX JIU-JITSU.', S['body']))
    story.append(Paragraph(
        '7.2. A autorização poderá ser revogada mediante comunicação formal à CONTRATADA.',
        S['body']))
    story.append(Paragraph(
        '7.3. Caso não concorde, deverá manifestar recusa formal no ato da matrícula.',
        S['body']))

    # ── Clause 8 ──────────────────────────────────────────────────────────────
    story += cl('oitava', 'Conduta e Responsabilidades')
    story.append(bullet('Proibida a gravação de aulas sem autorização expressa;', S['bullet']))
    story.append(bullet(
        'A CONTRATADA não se responsabiliza por objetos pessoais;', S['bullet']))
    story.append(bullet(
        'Conduta desrespeitosa sujeita o aluno a advertência ou desligamento.',
        S['bullet']))

    # ── Clause 9 ──────────────────────────────────────────────────────────────
    story += cl('nona', 'Do Aceite Digital e do Foro')
    story.append(Paragraph(
        '9.1. O presente contrato possui plena validade jurídica mediante aceite digital '
        'realizado no momento da matrícula online, nos termos da Lei nº 14.063/2020.',
        S['body']))
    story.append(Paragraph(
        '9.2. Fica eleito o foro da Comarca de Cajamar/SP para dirimir eventuais litígios '
        'decorrentes deste instrumento.', S['body']))

    # ── Clause 10 ─────────────────────────────────────────────────────────────
    story += cl('décima', 'Condições Neurológicas ou Psicológicas')
    story.append(Paragraph(
        '10.1. O CONTRATANTE compromete-se a informar qualquer condição neurológica, '
        'psicológica ou comportamental diagnosticada no aluno.', S['body']))
    story.append(Paragraph(
        '10.2. A CONTRATADA poderá solicitar laudo médico ou psicológico com orientações '
        'para garantir segurança e inclusão adequada.', S['body']))
    story.append(Paragraph(
        '10.3. O sigilo das informações será mantido, com uso restrito à adequação das '
        'atividades e suporte pedagógico.', S['body']))

    # ── Digital acceptance ────────────────────────────────────────────────────
    story.append(Spacer(1, 0.3*cm))
    story.append(HRFlowable(width='100%', thickness=1, color=GOLD, spaceAfter=8))
    story.append(Paragraph(
        'TERMOS DE ACEITE DIGITAL',
        ParagraphStyle('accept_title', fontName='Sans-B', fontSize=10, leading=14,
                       textColor=BLACK, spaceAfter=8, alignment=TA_LEFT)
    ))

    checks = [
        '☐  Li, compreendi e aceito integralmente os termos deste contrato.',
        '☐  Declaro que o aluno está apto à prática de atividades físicas.',
        '☐  Comprometo-me a informar a Blackbox Jiu-Jitsu sobre eventuais condições '
            'neurológicas ou psicológicas.',
        '☐  Respondi ao PAR-Q (Anexo I) com veracidade.',
    ]
    for c in checks:
        story.append(Paragraph(c, ParagraphStyle(
            'check', fontName='Sans', fontSize=9, leading=16,
            textColor=DARK, leftIndent=4, spaceAfter=2)))

    # ── Signature block ───────────────────────────────────────────────────────
    story.append(Spacer(1, 1.2*cm))
    sig_data = [
        [Paragraph('_' * 45, S['body']),
         Paragraph('_' * 45, S['body'])],
        [Paragraph('CONTRATANTE ou Responsável Legal', S['footer']),
         Paragraph('BLACKBOX JIU-JITSU — Responsável Técnico', S['footer'])],
        [Paragraph('Nome / CPF / Data', S['footer']),
         Paragraph('Jacson Ferreira da Silva Junior — CREF 199627-G/SP', S['footer'])],
    ]
    sig_tbl = Table(sig_data, colWidths=[8*cm, 8*cm])
    sig_tbl.setStyle(TableStyle([
        ('ALIGN',       (0,0), (-1,-1), 'CENTER'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING',(0,0), (-1,-1), 0),
        ('TOPPADDING',  (0,0), (-1,-1), 2),
        ('BOTTOMPADDING',(0,0),(-1,-1), 2),
    ]))
    story.append(sig_tbl)

    # ── PAGE BREAK → Annex I (PAR-Q) ─────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph(
        'ANEXO I — PAR-Q',
        ParagraphStyle('annex_title', fontName='Sans-B', fontSize=13, leading=17,
                       textColor=BLACK, spaceAfter=2, alignment=TA_CENTER)
    ))
    story.append(Paragraph(
        'Questionário de Prontidão para Atividade Física',
        ParagraphStyle('annex_sub', fontName='Sans-I', fontSize=10, leading=14,
                       textColor=GRAY, spaceAfter=6, alignment=TA_CENTER)
    ))
    story.append(HRFlowable(width='100%', thickness=1.5, color=GOLD, spaceAfter=12))

    story.append(Paragraph(
        'Responda <b>SIM</b> ou <b>NÃO</b> a cada pergunta. '
        'Se responder SIM a qualquer questão, procure orientação médica antes de iniciar '
        'a prática de atividades físicas.',
        S['body']))
    story.append(Spacer(1, 0.3*cm))

    questions = [
        'Algum médico já disse que você tem problema de coração e que só deveria praticar '
        'atividade física com supervisão médica?',
        'Você sente dores no peito quando pratica atividade física?',
        'No último mês, teve dor no peito mesmo sem fazer atividade física?',
        'Sente tontura ou perde a consciência com frequência?',
        'Tem algum problema ósseo ou articular que poderia piorar com a prática de '
        'atividade física?',
        'Já foi prescrito algum medicamento para pressão arterial ou coração?',
        'Há qualquer outro motivo pelo qual você não deveria praticar atividades físicas?',
    ]

    parq_rows = [[
        Paragraph('<b>Nº</b>', S['bold']),
        Paragraph('<b>Pergunta</b>', S['bold']),
        Paragraph('<b>SIM</b>', S['bold']),
        Paragraph('<b>NÃO</b>', S['bold']),
    ]]
    for i, q in enumerate(questions, 1):
        parq_rows.append([
            Paragraph(str(i), S['body']),
            Paragraph(q, S['body']),
            Paragraph('☐', S['body']),
            Paragraph('☐', S['body']),
        ])

    parq_tbl = Table(parq_rows, colWidths=[0.8*cm, 12.2*cm, 1.2*cm, 1.2*cm], repeatRows=1)
    parq_tbl.setStyle(TableStyle([
        ('BACKGROUND',  (0,0), (-1,0), BLACK),
        ('TEXTCOLOR',   (0,0), (-1,0), GOLD),
        ('FONTNAME',    (0,0), (-1,0), 'Sans-B'),
        ('FONTSIZE',    (0,0), (-1,0), 8),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, colors.HexColor('#F8F8F8')]),
        ('GRID',        (0,0), (-1,-1), 0.3, colors.HexColor('#CCCCCC')),
        ('ALIGN',       (2,0), (3,-1), 'CENTER'),
        ('ALIGN',       (0,0), (0,-1), 'CENTER'),
        ('VALIGN',      (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING',(0,0), (-1,-1), 5),
        ('TOPPADDING',  (0,0), (-1,-1), 5),
        ('BOTTOMPADDING',(0,0),(-1,-1), 5),
    ]))
    story.append(parq_tbl)
    story.append(Spacer(1, 0.5*cm))

    # PAR-Q declarations
    parq_checks = [
        '☐  Declaro que respondi ao PAR-Q de forma verdadeira e completa.',
        '☐  Procurarei orientação médica antes de iniciar as atividades caso tenha '
            'respondido "SIM" a qualquer pergunta.',
    ]
    for c in parq_checks:
        story.append(Paragraph(c, ParagraphStyle(
            'parq_check', fontName='Sans', fontSize=9, leading=16,
            textColor=DARK, leftIndent=4, spaceAfter=4)))

    # ── Final note ────────────────────────────────────────────────────────────
    story.append(Spacer(1, 0.4*cm))
    story.append(HRFlowable(width='100%', thickness=0.5, color=LGRAY, spaceAfter=6))
    story.append(Paragraph(
        'Este documento é parte integrante do Contrato de Prestação de Serviços Educacionais '
        'em Artes Marciais da Blackbox Jiu-Jitsu. A validade do aceite digital nos termos '
        'da Lei nº 14.063/2020 dispensa a assinatura física, sendo equivalente para todos '
        'os efeitos legais.',
        ParagraphStyle('note', fontName='Sans-I', fontSize=7.5, leading=11,
                       textColor=GRAY, alignment=TA_JUSTIFY)
    ))

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(f'✓ PDF gerado: {output_path}')


if __name__ == '__main__':
    out = os.path.join(os.path.dirname(__file__), '..', 'public', 'contrato-blackbox-bjj.pdf')
    build_pdf(os.path.abspath(out))
