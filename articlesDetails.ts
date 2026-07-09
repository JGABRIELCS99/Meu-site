export interface RichArticle {
  id: string;
  title: string;
  summary: string;
  introduction: string;
  situations: string[];
  causes: string;
  diagnostic: string;
  treatment: string;
}

export const ARTICLES_DETAILS: Record<string, RichArticle> = {
  'rescisao-indireta': {
    id: 'rescisao-indireta',
    title: 'Rescisão Indireta',
    summary: 'Entenda quando o empregador comete falta grave e você pode sair do emprego recebendo todos os seus direitos, como se tivesse sido demitido.',
    introduction: 'A rescisão indireta é a justa causa aplicada pelo trabalhador ao empregador quando este descumpre as cláusulas do contrato de trabalho ou a legislação. Trata-se de uma ferramenta poderosa que garante a dignidade da pessoa trabalhadora perante abusos frequentes da empresa, impedindo que o profissional precise pedir demissão e abrir mão de suas verbas rescisórias.',
    situations: [
      'Não recolhimento ou atraso recorrente dos depósitos do FGTS.',
      'Atraso frequente no pagamento dos salários ou décimo terceiro.',
      'Assédio moral praticado por superiores ou colegas com omissão da empresa.',
      'Não fornecimento de Equipamentos de Proteção Individual (EPIs) adequados.',
      'Exigência de serviços superiores às forças do trabalhador ou alheios ao contrato.'
    ],
    causes: 'O desrespeito intencional da empresa visando a redução ilegal de custos operacionais ou dificuldades financeiras internas que levam à supressão dos direitos básicos dos trabalhadores. Muitas empresas apostam no silêncio ou resignação do empregado para persistir na conduta ilícita.',
    diagnostic: 'A identificação do direito à rescisão indireta baseia-se na coleta de provas robustas que demonstrem as faltas patronais graves. O trabalhador deve reunir extratos do FGTS com lacunas de depósitos, contracheques atrasados, mensagens eletrônicas, áudios ou relatos testemunhais que comprovem o assédio moral ou as condições nocivas.',
    treatment: 'O trabalhador deve buscar assistência jurídica especializada para ingressar com uma ação trabalhista pleiteando a rescisão indireta. Em juízo, solicita-se a rescisão com o pagamento integral de todas as verbas: saldo de salário, aviso prévio indenizado, multa de 40%, seguro-desemprego e guias para saque total do FGTS acumulado. Nosso escritório analisa os fatos minuciosamente e ingressa com a ação protetiva.'
  },
  'calculos': {
    id: 'calculos',
    title: 'Cálculos Rescisórios',
    summary: 'Verifique se o valor pago na sua demissão está correto. Erros comuns podem custar caro ao trabalhador.',
    introduction: 'Realizar os cálculos de forma correta garante que nenhuma verba devida no momento do desligamento seja ignorada pelo empregador. Erros de cálculo em rescisões são extremamente comuns no mercado, privando o trabalhador de recursos cruciais em uma fase de transição profissional.',
    situations: [
      'Inexistência ou erro de cálculo no saldo de salário dos dias trabalhados.',
      'Pagamento incorreto ou incompleto do aviso prévio indenizado proporcional.',
      'Não inclusão da média de horas extras, adicionais ou comissões nas férias e 13º salário.',
      'Multa de 40% sobre o saldo total da conta vinculada do FGTS calculada incorretamente.',
      'Descontos indevidos efetuados diretamente no Termo de Rescisão (TRCT).'
    ],
    causes: 'Sistemas de RH desatualizados, má-fé ou falta de conhecimento das leis trabalhistas vigentes por parte da gerência financeira da empresa, que visam reduzir os custos de encerramento contratual.',
    diagnostic: 'A análise exige uma verificação minuciosa do Termo de Rescisão de Contrato de Trabalho (TRCT) em confronto com os holerites dos últimos doze meses, extrato atualizado da conta vinculada do FGTS e os cartões de ponto diários.',
    treatment: 'Nossa assessoria atua na elaboração de um cálculo técnico e pericial de todas as verbas rescisórias para confrontar a proposta da empresa. Caso sejam identificadas diferenças de valores, notificamos extrajudicialmente a empresa para retificação ou, persistindo o erro, ajuizamos a Reclamação Trabalhista competente para cobrança integral das verbas sonegadas.'
  },
  'acordo': {
    id: 'acordo',
    title: 'Acordo Rescisório',
    summary: 'Saiba como funciona a demissão por acordo mútuo e quais verbas você tem direito a receber.',
    introduction: 'Instituído pela Reforma Trabalhista, o acordo rescisório por mútuo consentimento permite a extinção do contrato de trabalho de forma lícita, sem a necessidade de simular demissões sem justa causa. Essa modalidade traz flexibilidade para o profissional que deseja se desligar da empresa mantendo parte dos seus direitos acumulados.',
    situations: [
      'Desejo mútuo de encerrar o vínculo contratual por razões de recolocação ou reestruturação.',
      'Impossibilidade de manutenção do trabalhador na equipe sem justificativa para justa causa.',
      'Necessidade de rescisão sem perda total de verbas pelo trabalhador, como no pedido de demissão comum.',
      'Garantia de saída planejada e pacífica para ambas as partes envolvidas no negócio.'
    ],
    causes: 'A necessidade de evitar litígios judiciais futuros e dar flexibilidade legal para transições profissionais onde o empregado não deseja pedir demissão pura (e perder o FGTS) nem o empregador deseja pagar a indenização máxima cheia.',
    diagnostic: 'Para sua validade legal, o acordo exige o livre consentimento mútuo, sem qualquer coação moral, pressão psicológica ou assédio por parte da empresa para que o trabalhador aceite termos inferiores aos garantidos pela Consolidação das Leis do Trabalho (CLT).',
    treatment: 'O acordo garante o pagamento de 50% do aviso prévio (se indenizado), 20% de multa sobre o saldo do FGTS, recebimento integral do saldo de salário, 13º proporcional e férias + 1/3 proporcional. Além disso, permite o saque de até 80% do saldo do FGTS depositado (sem direito ao seguro-desemprego). Nosso escritório atua na mediação, redação e validação do termo para que a transição ocorra de forma segura e transparente.'
  },
  'direitos': {
    id: 'direitos',
    title: 'Reclamação de Direitos',
    summary: 'Horas extras, adicional noturno, insalubridade e periculosidade. Não deixe seus direitos prescreverem.',
    introduction: 'A Reclamação de Direitos consiste no ajuizamento de ação judicial para buscar a reparação de inadimplementos graves cometidos durante o período de trabalho. Muitos trabalhadores prestam serviços além da jornada legal, em ambientes nocivos ou acumulando funções sem receber a devida contraprestação financeira prevista em lei.',
    situations: [
      'Horas extras laboradas e não registradas, não pagas e sem banco de horas regular.',
      'Falta de intervalo mínimo intrajornada destinado à alimentação e descanso diário.',
      'Não pagamento do adicional noturno ou cálculo incorreto da hora noturna reduzida.',
      'Prestação de serviços em condições de insalubridade ou periculosidade sem o respectivo adicional.',
      'Acúmulo de funções ou desvio de função sem o pagamento do acréscimo salarial correspondente.'
    ],
    causes: 'O descumprimento sistemático da legislação trabalhista e de convenções coletivas de trabalho por parte das empresas para auferir maiores lucros operacionais à custa da exaustão e do prejuízo financeiro do empregado.',
    diagnostic: 'A análise baseia-se na verificação de cartões de ponto, relatórios de produtividade, mensagens, e-mails de cobrança fora do expediente e laudos técnicos periciais relativos às condições do ambiente de trabalho do trabalhador.',
    treatment: 'O trabalhador dispõe do prazo constitucional de até 2 anos após a rescisão para ajuizar a reclamação, podendo reaver os valores sonegados referentes aos últimos 5 anos de contrato. Nosso escritório atua de forma rigorosa na produção das provas, elaboração técnica da petição inicial, cálculo exato das verbas devidas e representação combativa em audiências de conciliação e instrução.'
  },
  'salario-maternidade': {
    id: 'salario-maternidade',
    title: 'Salário Maternidade',
    summary: 'É possível conseguir o benefício com apenas 1 contribuição em casos específicos. Saiba como garantir esse direito essencial.',
    introduction: 'O Salário Maternidade é o benefício previdenciário pago à segurada do INSS por ocasião do nascimento do filho, adoção ou aborto não criminoso. Esse amparo financeiro visa proteger a gestante e a criança nos primeiros meses de vida, permitindo um desenvolvimento saudável e o afastamento seguro das atividades de trabalho.',
    situations: [
      'Nascimento de filho de trabalhadora desempregada com qualidade de segurada.',
      'Nascimento de filho de segurada que contribuiu apenas uma vez, dentro do período de graça previdenciário.',
      'Adoção de menor de idade por segurada ou segurado da Previdência Social.',
      'Parto de trabalhadora rural que atua em regime de economia familiar de subsistência.'
    ],
    causes: 'A necessidade de garantir a integridade da mãe e do recém-nascido através de transferência de renda temporária, substituindo o rendimento profissional no período de licença regulamentar.',
    diagnostic: 'Os requisitos exigem a comprovação da ocorrência do parto ou termo de guarda de adoção, juntamente com a manutenção da qualidade de segurada na data do fato gerador. Para as contribuintes individuais e facultativas, é exigida carência de 10 contribuições, enquanto para empregadas com carteira assinada ou desempregadas em período de graça essa carência pode não ser exigida.',
    treatment: 'O escritório gerencia todo o processo administrativo perante o INSS, preparando a documentação comprobatória, efetuando o agendamento e o acompanhamento do pedido. Caso haja indeferimento indevido sob justificativa de falta de carência ou perda de vínculo com a previdência, ingressamos com a correspondente ação judicial para concessão do benefício com pagamento de parcelas atrasadas.'
  },
  'aposentadorias': {
    id: 'aposentadorias',
    title: 'Aposentadorias (Urbana e Rural)',
    summary: 'Análise completa de tempo de contribuição e idade para aposentadoria urbana, rural e híbrida.',
    introduction: 'A aposentadoria é o benefício mensal de caráter continuado destinado a assegurar a manutenção e dignidade do cidadão após anos de contribuição ou trabalho no campo. A Reforma da Previdência modificou profundamente os requisitos de acesso a esse benefício, criando regras complexas que exigem análise altamente técnica.',
    situations: [
      'Segurado que atingiu a idade mínima urbana de 62 anos para mulheres e 65 anos para homens.',
      'Trabalhador que desempenha atividade rural e atingiu a idade reduzida de 55 anos para mulheres e 60 anos para homens.',
      'Profissional que possui tempo misto de labor urbano e rural, necessitando de aposentadoria híbrida.',
      'Contribuinte que necessita analisar as regras de transição vigentes para antecipar o direito à aposentadoria.'
    ],
    causes: 'O desgaste natural decorrente do ciclo de trabalho ao longo da vida e a necessidade social de proteção na velhice, garantindo rendimento fixo estável e proporcional à sua história de contribuições.',
    diagnostic: 'Identifica-se o melhor benefício por meio do histórico de CNIS, anotações de CTPS, certidões de tempo de contribuição de órgãos públicos e documentos comprobatórios do trabalho rural (notas fiscais, contratos agrários, ficha do sindicato de trabalhadores rurais).',
    treatment: 'Realizamos um Planejamento Previdenciário completo e individualizado, simulando todas as regras de transição aplicáveis pós-reforma para verificar em qual delas o cliente obterá o maior valor mensal de aposentadoria. Em seguida, conduzimos a homologação de períodos não reconhecidos pelo INSS e ingressamos com as ações de concessão judiciais necessárias.'
  },
  'professor': {
    id: 'professor',
    title: 'Aposentadoria do Professor',
    summary: 'Regras especiais e diferenciadas para os profissionais da educação. Planeje sua inatividade com segurança.',
    introduction: 'A aposentadoria do professor é um benefício diferenciado concedido aos profissionais que dedicaram suas carreiras às funções de magistério na educação infantil, ensino fundamental ou ensino médio. Pela penosidade do labor docente, a legislação estabelece regras com redução de tempo e idade, visando resguardar a saúde desses profissionais.',
    situations: [
      'Professora com tempo exclusivo de magistério na educação básica que atingiu 25 anos de contribuição.',
      'Professor com tempo exclusivo de magistério na educação básica que atingiu 30 anos de contribuição.',
      'Docentes da rede de ensino pública ou privada com aplicação das novas regras de transição de pedágio de 100% ou por pontos.',
      'Profissionais que desempenharam cargos de direção, coordenação ou assessoramento pedagógico na escola.'
    ],
    causes: 'O desgaste físico, vocal e emocional característico do exercício contínuo da docência na educação básica, reconhecido historicamente pela legislação constitucional.',
    diagnostic: 'Requer a comprovação rigorosa e ininterrupta do exercício das funções de docência, direção escolar, coordenação ou assessoramento pedagógico em estabelecimento de educação básica, por meio de CTPS, contratos de trabalho, ou certidões detalhadas de tempo de contribuição (CTC).',
    treatment: 'Nosso escritório analisa detalhadamente o histórico funcional do professor, realizando a contagem de tempo de serviço e avaliando o enquadramento na regra mais vantajosa antes ou após as alterações da Reforma. Conduzimos os requerimentos administrativos junto ao INSS ou regimes próprios de servidores públicos e ajuizamos ações para o cômputo integral de todo o período trabalhado.'
  },
  'incapacidade': {
    id: 'incapacidade',
    title: 'Auxílio Doença e Invalidez',
    summary: 'Como agir quando o INSS nega seu benefício mesmo você estando incapaz de trabalhar.',
    introduction: 'Os benefícios por incapacidade temporária (auxílio-doença) ou permanente (aposentadoria por invalidez) constituem direitos fundamentais de proteção ao trabalhador acometido por patologias físicas, psíquicas ou decorrentes de acidentes de qualquer natureza que o impeçam de exercer o seu sustento.',
    situations: [
      'Perda temporária da capacidade de trabalho decorrente de cirurgias ou fraturas.',
      'Trabalhadores acometidos por doenças graves crônicas, físicas ou oncológicas.',
      'Profissionais afastados em decorrência de transtornos psíquicos graves (depressão, ansiedade profunda, burnout).',
      'Negativa injustificada de prorrogação ou concessão do benefício após perícia médica do INSS.'
    ],
    causes: 'Acidentes de trabalho, de trajeto ou comuns, bem como o adoecimento biológico ou psicológico que inviabiliza de forma transitória ou permanente as atividades laborais normais da pessoa.',
    diagnostic: 'A prova do direito consiste na reunião de laudos médicos robustos emitidos por médicos especialistas com CID claro, receitas de medicamentos controlados, exames de imagem recentes, atestados de afastamento indicando repouso e comprovante da condição de segurado.',
    treatment: 'Frente ao elevado índice de indeferimento automático efetuado pelas perícias administrativas do INSS, ingressamos com ação judicial fundamentada. No âmbito judicial, o segurado é examinado por um perito médico especializado de confiança do juiz, garantindo uma avaliação imparcial e condizente com a real limitação de saúde, para reverter a negativa e conceder o benefício com retroativos.'
  },
  'contratos': {
    id: 'contratos',
    title: 'Elaboração e Análise de Contratos',
    summary: 'Proteja seus negócios com contratos sólidos e bem estruturados. Evite prejuízos e discussões judiciais futuras com uma assessoria preventiva.',
    introduction: 'O contrato constitui a lei privada reguladora entre os pactuantes. Dispor de instrumentos contratuais tecnicamente robustos e moldados à realidade do seu negócio previne conflitos de grandes proporções, reduz riscos de inadimplemento, estabelece limites de responsabilidade e resguarda juridicamente o patrimônio de pessoas físicas e jurídicas.',
    situations: [
      'Compra, venda ou permuta de imóveis, terrenos ou veículos de alto valor.',
      'Locações imobiliárias residenciais, comerciais, industriais ou em shopping centers.',
      'Contratos de prestação de serviços profissionais técnicos ou fornecimento de produtos.',
      'Acordos de sócios, memorandos de entendimento (MoU) ou contratos de confidencialidade (NDA).',
      'Análise de minutas contratuais abusivas enviadas por fornecedores ou instituições bancárias.'
    ],
    causes: 'O uso generalizado de modelos prontos da internet que não refletem as particularidades da transação e deixam cláusulas cruciais de multas, rescisão, prazos e foro em aberto ou ambíguas.',
    diagnostic: 'A análise preventiva consiste na revisão de cada cláusula do instrumento contratual para identificar brechas de interpretação, assimetrias de obrigações, multas em patamares abusivos ou riscos patrimoniais implícitos ao negócio.',
    treatment: 'Oferecemos assessoria jurídica completa para elaborar contratos sob medida, seguros e transparentes, ou realizar uma auditoria rigorosa (análise de risco) de minutas propostas por terceiros, intervindo na negociação direta para garantir o equilíbrio contratual e blindar o patrimônio do nosso cliente.'
  },
  'familia-sucessoes': {
    id: 'familia-sucessoes',
    title: 'Família e Sucessões',
    summary: 'Atuação sensível e técnica em divórcios, partilhas de bens, pensão alimentícia, inventários e planejamento sucessório para preservar o patrimônio familiar.',
    introduction: 'A área de Família e Sucessões demanda uma atuação jurídica diferenciada, pautada no acolhimento, no tato psicológico e no rigor técnico. Lidar com a divisão de patrimônios, a guarda de filhos ou o falecimento de entes queridos exige o máximo profissionalismo para alcançar soluções rápidas e amigáveis, diminuindo o sofrimento familiar.',
    situations: [
      'Divórcio consensual ou litigioso com necessidade de partilha de bens complexa.',
      'Definição jurídica de guarda de filhos menores de idade, alienação parental e regime de visitas.',
      'Fixação, oferta, revisão para majoração ou redução, ou execução de pensão alimentícia.',
      'Inventários e partilhas de bens judiciais ou extrajudiciais por escritura pública em cartório.',
      'Planejamento sucessório patrimonial para organização de herança em vida.'
    ],
    causes: 'Modificações estruturais na família que exigem regulamentação legal ou falecimento de entes queridos gerando necessidade de transmissão formal e legal de propriedade de patrimônio aos herdeiros.',
    diagnostic: 'Identifica-se pela análise documental de certidões de casamento, certidões de nascimento de filhos menores, escrituras de imóveis, documentos de veículos e certidões de óbito de inventariados.',
    treatment: 'Sempre que possível, atuamos na esfera extrajudicial (consensual) em cartório para garantir que divórcios e inventários terminem em poucos dias com baixo custo tributário. Nos casos em que há menores ou litígio insolúvel, representamos o cliente de forma intransigente em juízo, garantindo a partilha justa, a dignidade dos herdeiros e a subsistência alimentar das crianças.'
  },
  'indenizacoes': {
    id: 'indenizacoes',
    title: 'Indenizações e Responsabilidade Civil',
    summary: 'Busca pela reparação justa de danos morais e materiais causados por acidentes, ofensas, cobranças indevidas ou descumprimento de deveres.',
    introduction: 'A Responsabilidade Civil estabelece que aquele que, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, fica obrigado a reparar o prejuízo. A reparação deve ser integral, cobrindo os impactos patrimoniais diretos e também o abalo moral sofrido pela vítima de um ato ilícito.',
    situations: [
      'Acidentes de trânsito provocados por imprudência, excesso de velocidade ou embriaguez.',
      'Danos materiais graves causados em propriedades privadas decorrentes de obras vizinhas sem escoramento.',
      'Abatimento moral grave gerado por calúnias, difamações ou ofensas de grande alcance na internet.',
      'Erros e negligências médicas em procedimentos cirúrgicos de urgência ou plásticos.',
      'Prejuízos decorrentes de extravio definitivo de bagagens ou atraso injustificado em voos nacionais.'
    ],
    causes: 'O descumprimento de normas elementares de cuidado, deveres de segurança ou condutas ilícitas que quebram o equilíbrio social e impõem danos graves a pessoas inocentes.',
    diagnostic: 'Baseia-se no nexo de causalidade: a prova inquestionável de que a conduta culposa do agente causou diretamente os danos descritos. São utilizados boletins de ocorrência, orçamentos técnicos, prontuários hospitalares, relatórios periciais de engenharia, fotos e vídeos.',
    treatment: 'Conduzimos negociações extrajudiciais com seguradoras e ofensores para acordos rápidos. Se infrutífero, propomos ações de indenização pleiteando o ressarcimento dos Danos Materiais (danos emergentes e lucros cessantes), Danos Estéticos e Danos Morais, visando reestabelecer o status quo da vítima e coibir a reiteração da conduta do causador do dano.'
  },
  'consumidor': {
    id: 'consumidor',
    title: 'Direito do Consumidor',
    summary: 'Defesa contra abusos de grandes empresas, como bancos, operadoras de telefonia, planos de saúde e companhias aéreas.',
    introduction: 'O Direito do Consumidor protege o elo vulnerável nas transações comerciais de consumo, assegurando que grandes corporações respeitem as garantias do Código de Defesa do Consumidor (CDC). Práticas abusivas, cobranças disfarçadas e má qualidade de serviços exigem reação rápida e técnica.',
    situations: [
      'Inclusão indevida do nome do consumidor nos órgãos de proteção ao crédito (SPC/Serasa).',
      'Negativa ilegal de cobertura de procedimentos cirúrgicos, medicamentos de alto custo ou internações por planos de saúde.',
      'Fraudes bancárias com transferências indevidas por Pix ou contratação forçada de empréstimos consignados.',
      'Cancelamento unilateral e arbitrário de passagens aéreas ou atrasos extremos de voo sem assistência material.',
      'Produtos eletrônicos novos que apresentam vícios de fábrica sem resolução pela garantia autorizada.'
    ],
    causes: 'A prática mercantil abusiva de grandes empresas que apostam no desconhecimento e no cansaço do consumidor para lucrar irregularmente em escala nacional.',
    diagnostic: 'A prova do abuso baseia-se na apresentação da nota fiscal, fatura de consumo, comprovante de pagamento, contratos de adesão, números de protocolo de atendimento telefônico no SAC das empresas e prints das tentativas de reclamação.',
    treatment: 'Ingressamos com ações perante os Juizados Especiais Cíveis (JEC) ou Justiça Comum, pleiteando o cancelamento imediato de débitos fraudulentos, a substituição de bens danificados, a liberação de tratamentos médicos essenciais liminarmente (urgente) e a condenação das empresas ao pagamento de indenização por danos morais pedagógicos.'
  },
  'registro-inpi': {
    id: 'registro-inpi',
    title: 'Registro de Marca no INPI',
    summary: 'A sua marca é o seu maior patrimônio. Registrar no INPI é a única forma de garantir a propriedade exclusiva do nome e logotipo da sua empresa.',
    introduction: 'O Registro de Marca efetuado perante o Instituto Nacional da Propriedade Industrial (INPI) constitui a única ferramenta que concede o título de propriedade e uso exclusivo sobre uma marca em todo o território nacional. Sem este registro, a sua marca e logotipo estão desprotegidos, podendo ser copiados legalmente por terceiros ou, pior, você pode ser forçado a parar de usá-la.',
    situations: [
      'Empresários que investiram em fachadas, embalagens e marketing e correm risco de perder a marca.',
      'E-commerces e produtores digitais que precisam garantir a propriedade do nome e do domínio na internet.',
      'Franquias e redes que necessitam licenciar o uso da marca de forma segura e contratual.',
      'Concorrentes que registraram um nome idêntico para desviar a clientela do seu negócio.'
    ],
    causes: 'O equívoco comum de empresários que consideram que o registro simplificado do nome empresarial na Junta Comercial protege a marca nacionalmente contra cópias.',
    diagnostic: 'Verifica-se pela análise técnica se o sinal pretendido como marca é registrável (se possui distintividade) e se enquadra de forma correta nas classes específicas de atuação comercial previstas na Classificação de Nice.',
    treatment: 'Nossa assessoria atua em todo o ciclo de vida do registro de marca: desde o depósito inicial do pedido, recolhimento das taxas federais, acompanhamento semanal dos prazos legais do INPI, resposta a questionamentos do órgão, até a emissão definitiva e decenal do Certificado de Registro de Marca.'
  },
  'viabilidade': {
    id: 'viabilidade',
    title: 'Pesquisa de Viabilidade',
    summary: 'Realizamos uma busca minuciosa no banco de dados do INPI para saber se a sua marca está livre para registro antes de você investir dinheiro.',
    introduction: 'A Pesquisa de Viabilidade de Marca constitui o passo estratégico fundamental antes de qualquer investimento publicitário, registro ou divulgação de um novo negócio. Esse exame técnico identifica se o nome ou logotipo pretendido já se encontra registrado ou depositado por outra pessoa, mitigando riscos de indeferimento e processos judiciais.',
    situations: [
      'Criação de novos nomes de marcas, slogans ou logotipos para empresas nascentes.',
      'Processos de rebranding (reposicionamento de marca) para empresas já consolidadas.',
      'Avaliação prévia antes da contratação de agências de publicidade para criação de identidade visual.',
      'Identificação de conflitos fonéticos, gramaticais ou conceituais com marcas concorrentes.'
    ],
    causes: 'O elevado índice de pedidos de registro negados sumariamente pelo INPI em virtude da falta de originalidade das marcas ou semelhanças que causem confusão ao público.',
    diagnostic: 'A verificação consiste em uma pesquisa profunda e qualificada por palavras-chave, fonemas, radicais linguísticos e classes comerciais no banco de dados consolidado e histórico do INPI.',
    treatment: 'Emitimos um Parecer Técnico de Viabilidade fundamentado, classificando a registrabilidade da marca em níveis de risco (Baixo, Médio ou Alto). Oferecemos soluções jurídicas de adaptação terminológica, modificação gráfica ou enquadramento de classe para garantir que o cliente inicie seu processo de depósito com máxima chance de aprovação e sem desperdício de recursos.'
  },
  'oposicoes': {
    id: 'oposicoes',
    title: 'Oposições e Recursos',
    summary: 'Defesa ativa do seu processo contra contestações de concorrentes ou recursos contra decisões desfavoráveis do órgão avaliador.',
    introduction: 'O processo de registro de marca no INPI assemelha-se a um procedimento administrativo de caráter contencioso. Durante o andamento, qualquer terceiro interessado pode contestar o seu pedido por meio de Oposição, cabendo ao depositante contestar tais alegações com técnica jurídica especializada.',
    situations: [
      'Recebimento de Oposição protocolada por empresa concorrente no seu pedido de marca.',
      'Indeferimento do seu pedido de registro de marca emitido pela diretoria do INPI.',
      'Necessidade de protocolar oposição contra marca de concorrente que imita seu nome ou logo.',
      'Desejo de anular ato administrativo de concessão ilegal por infração de direito de propriedade.'
    ],
    causes: 'Conflitos decorrentes da tentativa de apropriação de marcas semelhantes que competem pelo mesmo público alvo dentro de um mercado de serviços ou produtos.',
    diagnostic: 'Avaliação técnica da similaridade fonética, semelhança gráfica, afinidade mercadológica de clientela e anterioridade de depósito entre as marcas em disputa jurídica.',
    treatment: 'Elaboramos defesas robustas de Manifestação à Oposição, Recursos contra Indeferimento e Oposições contra Terceiros. Nossas peças são fundamentadas na Lei de Propriedade Industrial (LPI), diretrizes oficiais do INPI e decisões consolidadas da Justiça Federal, aumentando significativamente a taxa de êxito na reversão de pareceres negativos.'
  },
  'notificacoes': {
    id: 'notificacoes',
    title: 'Notificações por Uso Indevido',
    summary: 'Ação rápida contra quem está copiando ou utilizando sua marca sem autorização, exigindo a cessação imediata sob pena de indenização.',
    introduction: 'Uma vez obtido o Certificado de Registro de Marca, o titular adquire o direito de usá-la com exclusividade e o dever de zelar por sua integridade. O uso desautorizado de marca por concorrente configura crime de concorrência desleal e infração marcaria, autorizando medidas legais imediatas de repreensão.',
    situations: [
      'Identificação de empresa concorrente que utiliza nome idêntico ou similar ao seu no comércio local.',
      'Utilização de logotipo de sua propriedade em sites, redes sociais ou anúncios do Google Ads por terceiros.',
      'Clonagem de páginas de vendas e sites para se fazer passar pela sua empresa para clientes.',
      'Uso de termos de sua marca como palavra-chave patrocinada de anúncios de concorrentes.'
    ],
    causes: 'A concorrência desleal e a má-fé mercantil que buscam desviar a clientela e se aproveitar da reputação e investimento em branding construídos por outra empresa.',
    diagnostic: 'Comprova-se com a apresentação do Certificado de Registro de Marca vigente emitido pelo INPI em confronto com capturas de tela, fotos de produtos falsificados, atas notariais ou links do uso ilegal perpetrado.',
    treatment: 'Elaboramos e enviamos uma Notificação Extrajudicial formal estabelecendo prazos peremptórios (normalmente de 24h a 72h) para a completa remoção de anúncios, alteração de fachadas, desvinculação de domínios e alteração do nome empresarial do infrator. Caso não seja atendida, propomos Ação Inibitória com pedido de tutela provisória de urgência (liminar) para interrupção forçada do uso sob multa diária, cumulada com indenização pecuniária por perdas e danos materiais e morais.'
  }
};
