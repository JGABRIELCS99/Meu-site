import React from 'react';
import { Scale, Briefcase, HeartHandshake, Calculator, FileText, AlertCircle, Copyright } from 'lucide-react';
import { ContactInfo, FaqItem, ServiceArea } from './types';

// --- IMAGENS ---
// COMO ALTERAR AS FOTOS:
// 1. Hospede sua imagem em algum lugar (ou coloque na pasta public do projeto)
// 2. Substitua o link entre aspas ("") pelo link da sua imagem real.

export const IMAGES = {
  // LOGO: Link para a imagem da sua logomarca
  // Link atualizado para o ícone da marca
  LOGO: "https://lh3.googleusercontent.com/d/1p3Ff_i9V9KoWPiwUgEDamIq6U4IZhBin", 

  // FOTO 1 (PRINCIPAL): Foto de destaque que aparece no topo do site.
  // Sugestão: Foto de braços cruzados ou perfil profissional elegante.
  // Nota: Link atualizado para formato direto lh3. Certifique-se que o arquivo está Público no Drive.
  HERO_PORTRAIT: "https://lh3.googleusercontent.com/d/1QYeSTARApJLgWtkSthwdTSYFvAatAK7k", 

  // FOTO 2 (SOBRE MIM): Foto que aparece na seção "Sobre Gabriel Costa".
  // Sugestão: Uma foto diferente da principal, talvez sorrindo ou em ação.
  ABOUT_PORTRAIT: "https://lh3.googleusercontent.com/d/1xtI5W0RuD2xyhlKLcmXQlFO2Bd1NaSzt", 
};

// --- DADOS DE CONTATO ---
export const CONTACT_DATA: ContactInfo = {
  email: "jgabrielcostasouza@gmail.com",
  phone: "(73) 98205-2016", // Número corrigido
  address: "Avenida Beira Mar, Nº 45, Escritório, Camamu-BA",
  whatsappUrl: "https://wa.me/5573982052016", // Link corrigido para o novo número
  // Mapa atualizado para busca direta do endereço
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Avenida+Beira+Mar,+45,+Camamu-BA&t=&z=15&ie=UTF8&iwloc=&output=embed" 
};

// --- SERVIÇOS E ARTIGOS ---
export const SERVICES: ServiceArea[] = [
  {
    id: 'trabalhista',
    title: 'Direito Trabalhista',
    description: 'Defesa intransigente dos seus direitos nas relações de trabalho.',
    icon: <Briefcase className="w-8 h-8 text-gold-500" />,
    articles: [
      {
        id: 'rescisao-indireta',
        title: 'Rescisão Indireta',
        summary: 'Entenda quando o empregador comete falta grave e você pode sair do emprego recebendo todos os seus direitos, como se tivesse sido demitido.'
      },
      {
        id: 'calculos',
        title: 'Cálculos Rescisórios',
        summary: 'Verifique se o valor pago na sua demissão está correto. Erros comuns podem custar caro ao trabalhador.'
      },
      {
        id: 'acordo',
        title: 'Acordo Rescisório',
        summary: 'Saiba como funciona a demissão por acordo mútuo e quais verbas você tem direito a receber.'
      },
      {
        id: 'direitos',
        title: 'Reclamação de Direitos',
        summary: 'Horas extras, adicional noturno, insalubridade e periculosidade. Não deixe seus direitos prescreverem.'
      }
    ]
  },
  {
    id: 'previdenciario',
    title: 'Direito Previdenciário',
    description: 'Planejamento e atuação para garantir o melhor benefício no INSS.',
    icon: <Scale className="w-8 h-8 text-gold-500" />,
    articles: [
      {
        id: 'salario-maternidade',
        title: 'Salário Maternidade',
        summary: 'É possível conseguir o benefício com apenas 1 contribuição em casos específicos. Saiba como garantir esse direito essencial.'
      },
      {
        id: 'aposentadorias',
        title: 'Aposentadorias (Urbana e Rural)',
        summary: 'Análise completa de tempo de contribuição e idade para aposentadoria urbana, rural e híbrida.'
      },
      {
        id: 'professor',
        title: 'Aposentadoria do Professor',
        summary: 'Regras especiais e diferenciadas para os profissionais da educação. Planeje sua inatividade com segurança.'
      },
      {
        id: 'incapacidade',
        title: 'Auxílio Doença e Invalidez',
        summary: 'Como agir quando o INSS nega seu benefício mesmo você estando incapaz de trabalhar.'
      }
    ]
  },
  {
    id: 'civil',
    title: 'Direito Civil',
    description: 'Soluções jurídicas preventivas e contenciosas para proteger você e seus bens.',
    icon: <HeartHandshake className="w-8 h-8 text-gold-500" />,
    articles: [
      {
        id: 'contratos',
        title: 'Elaboração e Análise de Contratos',
        summary: 'Proteja seus negócios com contratos sólidos e bem estruturados. Evite prejuízos e discussões judiciais futuras com uma assessoria preventiva.'
      },
      {
        id: 'familia-sucessoes',
        title: 'Família e Sucessões',
        summary: 'Atuação sensível e técnica em divórcios, partilhas de bens, pensão alimentícia, inventários e planejamento sucessório para preservar o patrimônio familiar.'
      },
      {
        id: 'indenizacoes',
        title: 'Indenizações e Responsabilidade Civil',
        summary: 'Busca pela reparação justa de danos morais e materiais causados por acidentes, ofensas, cobranças indevidas ou descumprimento de deveres.'
      },
      {
        id: 'consumidor',
        title: 'Direito do Consumidor',
        summary: 'Defesa contra abusos de grandes empresas, como bancos, operadoras de telefonia, planos de saúde e companhias aéreas.'
      }
    ]
  },
  {
    id: 'marcas',
    title: 'Registro de Marcas',
    description: 'Garanta a exclusividade e a segurança da sua marca em todo o Brasil.',
    icon: <Copyright className="w-8 h-8 text-gold-500" />,
    articles: [
      {
        id: 'registro-inpi',
        title: 'Registro de Marca no INPI',
        summary: 'A sua marca é o seu maior patrimônio. Registrar no INPI é a única forma de garantir a propriedade exclusiva do nome e logotipo da sua empresa.'
      },
      {
        id: 'viabilidade',
        title: 'Pesquisa de Viabilidade',
        summary: 'Realizamos uma busca minuciosa no banco de dados do INPI para saber se a sua marca está livre para registro antes de você investir dinheiro.'
      },
      {
        id: 'oposicoes',
        title: 'Oposições e Recursos',
        summary: 'Defesa ativa do seu processo contra contestações de concorrentes ou recursos contra decisões desfavoráveis do órgão avaliador.'
      },
      {
        id: 'notificacoes',
        title: 'Notificações por Uso Indevido',
        summary: 'Ação rápida contra quem está copiando ou utilizando sua marca sem autorização, exigindo a cessação imediata sob pena de indenização.'
      }
    ]
  }
];

// --- PERGUNTAS FREQUENTES (FAQ) ---

export const FAQS_TRABALHISTA: FaqItem[] = [
  {
    question: "O que é a Rescisão Indireta?",
    answer: "A rescisão indireta ocorre quando a empresa comete uma falta grave (como atraso de salários, não recolhimento de FGTS ou assédio), permitindo que o empregado encerre o contrato mantendo o direito a todas as verbas, como se tivesse sido demitido sem justa causa."
  },
  {
    question: "Quem tem direito ao adicional de Insalubridade?",
    answer: "Trabalhadores expostos a agentes nocivos à saúde (como ruído excessivo, calor, produtos químicos ou biológicos) acima dos limites de tolerância têm direito a um adicional que varia entre 10%, 20% ou 40% do salário mínimo."
  },
  {
    question: "Quanto tempo demora um processo trabalhista?",
    answer: "O tempo varia conforme a complexidade do caso e a vara judicial. Em média, a primeira audiência ocorre em alguns meses. Nosso foco é sempre buscar a solução mais célere e eficaz."
  },
  {
    question: "Quais meus direitos ao pedir demissão?",
    answer: "Ao pedir demissão, você recebe saldo de salário, 13º proporcional e férias proporcionais + 1/3. Porém, perde o saque do FGTS e a multa de 40%. É fundamental realizar o cálculo rescisório com um advogado para garantir que os valores pagos pela empresa estão corretos e evitar prejuízos."
  },
  {
    question: "Posso cobrar meus direitos sem ser na justiça?",
    answer: "Sim. É possível buscar um acordo extrajudicial, onde o advogado notifica a empresa para tentar uma resolução amigável e rápida. Caso não haja acordo, a via judicial permanece como opção para garantir o que é seu por direito."
  }
];

export const FAQS_PREVIDENCIARIO: FaqItem[] = [
  {
    question: "Preciso ter pago INSS para receber Salário Maternidade?",
    answer: "Geralmente sim, mas existem situações específicas. Desempregadas podem ter direito se estiverem no 'período de graça'. Trabalhadoras rurais (seguradas especiais) também têm regras diferenciadas, muitas vezes não precisando de contribuição mensal direta."
  },
  {
    question: "O INSS negou meu benefício por incapacidade. O que fazer?",
    answer: "A negativa do INSS não é definitiva. É possível ingressar com uma ação judicial onde você passará por uma perícia com um médico de confiança do juiz, o que aumenta significativamente as chances de reverter a decisão."
  },
  {
    question: "O escritório atende online para benefícios do INSS?",
    answer: "Sim. Realizamos atendimentos presenciais em Camamu-BA e online para todo o Brasil via WhatsApp e videochamada, garantindo agilidade e conforto."
  },
  {
    question: "Com quantos anos posso me aposentar?",
    answer: "A idade varia conforme o tipo de aposentadoria (Idade, Tempo de Contribuição, Especial, Rural). Em regra geral após a Reforma, a idade mínima urbana é de 62 anos para mulheres e 65 para homens, mas existem diversas regras de transição que podem antecipar esse momento."
  },
  {
    question: "Posso me aposentar sem nunca ter contribuído?",
    answer: "Tecnicamente a aposentadoria exige contribuição, mas existem benefícios para quem não pagou INSS: 1) Trabalhador Rural (Segurado Especial) que comprova atividade no campo; 2) BPC/LOAS, um benefício assistencial de um salário mínimo para idosos (65+) ou deficientes de baixa renda."
  }
];

export const FAQS_CIVIL: FaqItem[] = [
  {
    question: "Por que é importante ter um contrato elaborado por um advogado?",
    answer: "Modelos prontos da internet geralmente não cobrem as particularidades da sua negociação. Um contrato personalizado estabelece regras claras sobre prazos, multas, obrigações e rescisão, protegendo você de processos e calotes."
  },
  {
    question: "Como funciona o processo de Inventário?",
    answer: "O inventário serve para formalizar a transferência dos bens de uma pessoa falecida para os seus herdeiros. Ele pode ser feito em cartório (extrajudicial) de forma muito rápida se todos os herdeiros forem maiores de idade, capazes e estiverem de acordo."
  },
  {
    question: "O que caracteriza dano moral passível de indenização?",
    answer: "O dano moral ocorre quando há uma ofensa grave à honra, à imagem, à dignidade ou ao bem-estar psicológico da pessoa, superando o mero aborrecimento do dia a dia. Exemplos comuns incluem negativação indevida do nome, atrasos absurdos de voo ou ofensas públicas."
  },
  {
    question: "O que fazer em caso de descumprimento de oferta por uma empresa?",
    answer: "O Código de Defesa do Consumidor exige que toda oferta publicitária seja cumprida. Se a empresa se recusar, você pode exigir o cumprimento forçado da obrigação, aceitar outro produto equivalente ou rescindir o contrato com direito à restituição do valor pago atualizado."
  }
];

export const FAQS_MARCAS: FaqItem[] = [
  {
    question: "Ter o CNPJ registrado na Junta Comercial protege minha marca?",
    answer: "Não! O registro na Junta Comercial protege o 'Nome Empresarial' apenas no estado de registro. A única forma de proteger o nome comercial e o logotipo em todo o Brasil, impedindo outros de copiarem, é registrando a marca no INPI."
  },
  {
    question: "Quanto tempo dura o registro de uma marca?",
    answer: "O registro de marca concedido pelo INPI tem validade de 10 anos, contados a partir da data de concessão. Ele pode ser prorrogado sucessivamente por novos períodos de 10 anos, sem limite, garantindo a proteção perpétua da sua identidade."
  },
  {
    question: "O que acontece se eu usar uma marca que já possui registro?",
    answer: "Você pode ser notificado extrajudicialmente para cessar o uso imediatamente, perder todo o investimento feito em fachadas, embalagens, redes sociais e domínio, e ainda ser condenado a pagar uma indenização por uso indevido de marca alheia."
  },
  {
    question: "Como funciona o processo de registro de marca no INPI?",
    answer: "Inicia-se com a busca de viabilidade, seguida pelo protocolo do pedido (depósito). O processo passa por fases de publicação para oposição de terceiros, exame de mérito pelo INPI e, finalmente, a concessão e emissão do certificado."
  }
];