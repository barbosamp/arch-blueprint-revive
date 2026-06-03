const Cl = ({ num, title }: { num: string; title: string }) => (
  <h3 className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase mt-6 mb-2">
    Cláusula {num} — {title}
  </h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] text-mid-gray/80 leading-relaxed mb-1">{children}</p>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2 text-[11px] text-mid-gray/80 leading-relaxed">
    <span className="text-gold/50 shrink-0 mt-0.5">·</span>
    <span>{children}</span>
  </li>
);

export default function ContractText() {
  return (
    <div className="space-y-1">
      <p className="font-mono text-[10px] tracking-[0.25em] text-white-belt uppercase mb-4">
        Contrato de Prestação de Serviços Educacionais em Artes Marciais
      </p>

      <P>
        Pelo presente instrumento particular, de um lado a{' '}
        <strong className="text-white-belt">BLACKBOX JIU-JITSU</strong>, inscrita no CNPJ sob o nº{' '}
        <strong className="text-white-belt">46.383.547/0001-14</strong>, com sede na{' '}
        <strong className="text-white-belt">Rua Waldemar Meira, nº 665, Bairro Portais, Cajamar — SP</strong>, neste
        ato representada por seu responsável técnico,{' '}
        <strong className="text-white-belt">Sr. Jacson Ferreira da Silva Junior</strong>, portador do CREF nº
        199627-G/SP, doravante denominada <strong className="text-white-belt">CONTRATADA</strong>, e de outro lado o{' '}
        <strong className="text-white-belt">ALUNO</strong> ou seu{' '}
        <strong className="text-white-belt">RESPONSÁVEL LEGAL</strong> (quando menor de idade), cujos dados são
        fornecidos no momento da matrícula digital, doravante denominado{' '}
        <strong className="text-white-belt">CONTRATANTE</strong>.
      </P>

      <Cl num="Primeira" title="Do Objeto" />
      <P>
        1.1. O presente contrato tem por objeto a prestação de serviços educacionais de ensino da arte marcial
        Jiu-Jitsu, nas seguintes modalidades:
      </P>
      <ul className="space-y-0.5 mb-2 pl-1">
        <Li>Turmas regulares coletivas;</Li>
        <Li>Aulas personalizadas (individuais).</Li>
      </ul>
      <P>
        1.2. A modalidade contratada será selecionada pelo CONTRATANTE no ato da matrícula digital, de acordo com as
        opções disponíveis no site oficial da CONTRATADA.
      </P>

      <Cl num="Segunda" title="Dos Planos e Valores" />
      <P>
        <strong className="text-white-belt/70">Plano Kids — Turmas Regulares</strong>
      </P>
      <ul className="space-y-0.5 mb-2 pl-1">
        <Li>Kids I (4 a 6 anos) — 1× por semana: R$179,00/mês</Li>
        <Li>Kids II (6 a 12 anos) — Até 3× por semana: R$229,00/mês</Li>
        <Li>Kids Full — Acesso diário: R$279,00/mês</Li>
      </ul>
      <P>
        <strong className="text-white-belt/70">Plano Família (acesso diário)</strong>
      </P>
      <ul className="space-y-0.5 mb-2 pl-1">
        <Li>2 alunos: R$389,00/mês</Li>
        <Li>3 alunos: R$499,00/mês</Li>
      </ul>
      <P>
        <strong className="text-white-belt/70">Plano Adulto</strong>
      </P>
      <ul className="space-y-0.5 mb-2 pl-1">
        <Li>Mensal recorrente: R$229,00/mês</Li>
        <Li>Anual à vista: R$2.388,00 (equivalente a R$199,00/mês)</Li>
        <Li>Mensal avulso: R$279,00</Li>
      </ul>
      <P>
        <strong className="text-white-belt/70">Plano Personal Kids</strong>
      </P>
      <ul className="space-y-0.5 mb-2 pl-1">
        <Li>1× por semana (45 min): R$300,00</Li>
        <Li>2× por semana (45 min cada): R$450,00</Li>
      </ul>
      <P>
        <strong className="text-white-belt/70">Taxa de matrícula única:</strong> R$50,00 por aluno.{' '}
        <strong className="text-white-belt/70">Formas de pagamento:</strong> PIX, cartão de crédito ou dinheiro.
      </P>

      <Cl num="Terceira" title="Do Reajuste" />
      <P>
        3.1. Os valores serão reajustados anualmente a partir de 15 de fevereiro de 2026, conforme o IPCA e os
        custos operacionais.
      </P>
      <P>3.2. Alunos adimplentes mantêm o valor anterior por até 12 (doze) meses após o reajuste.</P>

      <Cl num="Quarta" title="Das Obrigações do Contratante" />
      <P>O CONTRATANTE se compromete a:</P>
      <ul className="space-y-0.5 mb-2 pl-1">
        <Li>Cumprir o regulamento interno da CONTRATADA;</Li>
        <Li>
          Utilizar uniforme oficial BLACKBOX JIU-JITSU (kimono e No-Gi) em até 6 meses após a matrícula;
        </Li>
        <Li>Apresentar atestado médico ou preencher o PAR-Q (Anexo I);</Li>
        <Li>Manter os pagamentos em dia, inclusive em caso de ausência sem justificativa.</Li>
      </ul>

      <Cl num="Quinta" title="Do PAR-Q e Aptidão Física" />
      <P>
        5.1. O CONTRATANTE declara que o aluno encontra-se em plenas condições físicas e mentais para a prática de
        atividades físicas, conforme as respostas fornecidas ao PAR-Q.
      </P>
      <P>
        5.2. A CONTRATADA se exime de responsabilidade por informações de saúde omitidas ou por condições
        preexistentes não comunicadas.
      </P>

      <Cl num="Sexta" title="Da Suspensão, Cancelamento e Reposições" />
      <P>
        <strong className="text-white-belt/70">6.1. Aulas Personalizadas</strong>
      </P>
      <P>6.1.1. Permitida 1 reposição por mês, com aviso mínimo de 12 horas.</P>
      <P>6.1.2. Reposição com menos de 12h dependerá de acordo entre as partes.</P>
      <P>
        <strong className="text-white-belt/70">6.2. Planos Regulares</strong>
      </P>
      <P>6.2.1. Após 8 meses, pode-se congelar o plano por até 30 dias, com aviso de 5 dias úteis.</P>
      <P>6.2.2. Cancelamento sem multa exige atestado médico de incapacidade definitiva.</P>
      <P>
        6.2.3. Cancelamento sem aviso prévio de 30 dias sujeita o CONTRATANTE à multa equivalente a 1 (uma)
        mensalidade vigente.
      </P>
      <P>
        <strong className="text-white-belt/70">6.3.</strong> Ausência não justifica inadimplência.
      </P>

      <Cl num="Sétima" title="Do Uso de Imagem" />
      <P>
        7.1. O CONTRATANTE autoriza o uso gratuito da imagem, nome e voz do aluno para fins institucionais e
        promocionais da BLACKBOX JIU-JITSU.
      </P>
      <P>7.2. A autorização poderá ser revogada mediante comunicação formal à CONTRATADA.</P>
      <P>7.3. Caso não concorde, deverá manifestar recusa formal no ato da matrícula.</P>

      <Cl num="Oitava" title="Conduta e Responsabilidades" />
      <ul className="space-y-0.5 mb-2 pl-1">
        <Li>Proibida a gravação de aulas sem autorização expressa;</Li>
        <Li>A CONTRATADA não se responsabiliza por objetos pessoais;</Li>
        <Li>Conduta desrespeitosa sujeita o aluno a advertência ou desligamento.</Li>
      </ul>

      <Cl num="Nona" title="Do Aceite Digital e do Foro" />
      <P>
        9.1. O presente contrato possui plena validade jurídica mediante aceite digital realizado no momento da
        matrícula online, nos termos da Lei nº 14.063/2020.
      </P>
      <P>
        9.2. Fica eleito o foro da Comarca de Cajamar/SP para dirimir eventuais litígios decorrentes deste
        instrumento.
      </P>

      <Cl num="Décima" title="Condições Neurológicas ou Psicológicas" />
      <P>
        10.1. O CONTRATANTE compromete-se a informar qualquer condição neurológica, psicológica ou comportamental
        diagnosticada no aluno.
      </P>
      <P>
        10.2. A CONTRATADA poderá solicitar laudo médico ou psicológico com orientações para garantir segurança e
        inclusão adequada.
      </P>
      <P>
        10.3. O sigilo das informações será mantido, com uso restrito à adequação das atividades e suporte
        pedagógico.
      </P>
    </div>
  );
}
