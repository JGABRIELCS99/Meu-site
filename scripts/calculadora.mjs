// Página /calculadora-rescisao/ — calculadora simplificada de verbas rescisórias.
// Gerada pelo build-articles.mjs, com o mesmo cabeçalho, rodapé e estilos dos artigos.
// Todo o cálculo roda no navegador do visitante: nenhum dado é enviado ao servidor.

export const CALC_SLUG = 'calculadora-rescisao';
export const CALC_ATUALIZADO = '2026-11-15';

const CSS_CALC = `
.calc{background:#fff;border:1px solid var(--line);border-radius:20px;padding:24px;margin:26px 0;box-shadow:0 10px 26px rgba(10,34,24,.06)}
.calc h2{font-family:'Playfair Display',serif;color:var(--forest-d);font-size:24px;margin:0 0 4px}
.calc .sub{font-size:14px;color:var(--muted);margin:0 0 18px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 18px}
@media(max-width:640px){.grid{grid-template-columns:1fr}}
.f label{display:block;font-size:14px;font-weight:600;color:var(--forest-d);margin-bottom:6px}
.f small{display:block;font-size:12px;color:var(--muted);margin-top:4px;line-height:1.4}
.f input,.f select{width:100%;font:inherit;font-size:16px;padding:11px 12px;border:1px solid #d9cfb8;border-radius:10px;background:#fdfcf9;color:var(--text)}
.f input:focus,.f select:focus{outline:2px solid var(--gold);border-color:var(--gold)}
.full{grid-column:1/-1}
.go{margin-top:20px;width:100%;border:0;cursor:pointer;font:600 16px Inter,sans-serif;background:var(--forest);color:#fff;border-radius:16px 0 16px 0;padding:15px}
.go:hover{background:var(--forest-d)}
.err{color:#a3341f;font-size:14px;margin:12px 0 0;display:none}
#res{display:none;margin-top:26px;scroll-margin-top:90px}
.res-head{background:var(--forest-d);color:var(--cream);border-radius:16px;padding:20px 22px}
.res-head span{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.res-head strong{display:block;font-family:'Playfair Display',serif;font-size:36px;color:#fff;line-height:1.2;margin:4px 0}
.res-head p{margin:0;font-size:14px;color:#d9d4c7;line-height:1.5}
.tab{width:100%;border-collapse:collapse;font-size:15px;margin:16px 0 6px}
.tab td{border-bottom:1px solid var(--line);padding:10px 4px;vertical-align:top;line-height:1.45}
.tab td:last-child{text-align:right;white-space:nowrap;font-weight:600;color:var(--forest-d)}
.tab td small{display:block;color:var(--muted);font-size:12px;font-weight:400}
.tab tr.neg td:last-child{color:#a3341f}
.tab tr.tot td{border-bottom:0;font-weight:700;font-size:16px}
.info{background:var(--cream2);border-radius:12px;padding:14px 16px;font-size:14px;line-height:1.55;margin:14px 0}
.info b{color:var(--forest-d)}
.miss{border:1px solid #ead9b5;background:#fbf6ea;border-radius:16px;padding:18px 20px;margin:18px 0}
.miss h3{font-family:'Playfair Display',serif;color:var(--forest-d);font-size:20px;margin:0 0 8px}
.miss ul{margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.55}
.miss .btn{font-size:15px;padding:12px 22px}
.hint{font-size:13px;color:var(--muted);text-align:center;margin:10px 0 0}
.f input[type=date]{-webkit-appearance:none;appearance:none;min-height:48px;display:block;line-height:1.2}
.go,.f select,.f input{min-height:48px}
.tbl{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:10px 0 24px}.tbl table{margin:0;min-width:560px;font-size:15px}
.hero{padding-bottom:0}.hero .lead{margin-bottom:0}
@media(max-width:520px){.calc{padding:18px 16px;margin:18px 0;border-radius:16px}.res-head strong{font-size:30px}.tab{font-size:14px}.hero h1{font-size:30px}.hero .lead{font-size:17px}.miss{padding:16px}}
`;

function scriptCalc(whatsapp) {
  return `<script>
(function(){
  var WA = ${JSON.stringify(whatsapp)};
  var $ = function(id){ return document.getElementById(id); };
  var brl = function(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); };
  var MOT = {sjc:'Dispensa sem justa causa', pedido:'Pedido de demissão', justa:'Dispensa por justa causa', acordo:'Acordo entre as partes (art. 484-A da CLT)'};

  function data(s){ if(!s) return null; var p=s.split('-'); return new Date(+p[0],+p[1]-1,+p[2]); }
  function addDias(d,n){ var x=new Date(d); x.setDate(x.getDate()+n); return x; }
  function addMeses(d,n){ var x=new Date(d.getFullYear(), d.getMonth()+n, d.getDate()); if(x.getDate()!==d.getDate()) x.setDate(0); return x; }
  function difDias(a,b){ return Math.round((b-a)/86400000); }
  function anosCompletos(a,b){ var n=b.getFullYear()-a.getFullYear(); if(b<new Date(b.getFullYear(),a.getMonth(),a.getDate())) n--; return Math.max(0,n); }
  // Meses de serviço contando a fração superior a 14 dias como mês inteiro (CLT, art. 146, parágrafo único).
  function mesesFracao(ini,fim){
    if(fim<ini) return 0; var m=0, cur=ini;
    while(true){ var prox=addMeses(cur,1); if(addDias(prox,-1)<=fim){ m++; cur=prox; } else break; }
    var resto=difDias(cur,fim)+1; if(resto>14) m++; return m;
  }
  // 13º: meses do ano da saída em que trabalhou 15 dias ou mais (Lei 4.090/1962).
  function meses13(adm,fim){
    var ini=new Date(fim.getFullYear(),0,1); if(adm>ini) ini=adm; var m=0;
    for(var mes=ini.getMonth(); mes<=fim.getMonth(); mes++){
      var a=new Date(fim.getFullYear(),mes,1), b=new Date(fim.getFullYear(),mes+1,0);
      if(a<ini) a=ini; if(b>fim) b=fim; if(difDias(a,b)+1>=15) m++;
    }
    return m;
  }
  function ajustaAviso(){
    var mot=$('motivo').value, sel=$('aviso'), box=$('box-aviso');
    var ops={sjc:[['indenizado','Indenizado (fui dispensado na hora)'],['trabalhado','Trabalhado (cumpri o aviso)']],
             pedido:[['cumprido','Cumpri o aviso'],['nao','Não cumpri o aviso'],['dispensado','A empresa me dispensou de cumprir']],
             acordo:[['indenizado','Indenizado pela metade (regra do acordo)']], justa:[]};
    sel.innerHTML=''; (ops[mot]||[]).forEach(function(o){ var e=document.createElement('option'); e.value=o[0]; e.textContent=o[1]; sel.appendChild(e); });
    box.style.display=ops[mot].length?'':'none';
  }
  $('motivo').addEventListener('change',ajustaAviso); ajustaAviso();

  $('calcular').addEventListener('click',function(){
    var err=$('err'); err.style.display='none';
    var sal=parseFloat(String($('salario').value).replace(/\\./g,'').replace(',','.'));
    var adm=data($('admissao').value), sai=data($('saida').value), mot=$('motivo').value, av=$('aviso').value;
    var venc=parseInt($('vencidas').value,10)||0;
    var fgtsInf=String($('fgts').value).trim(); var fgtsSaldo=fgtsInf?parseFloat(fgtsInf.replace(/\\./g,'').replace(',','.')):NaN;
    if(!(sal>0)||!adm||!sai){ err.textContent='Preencha o salário e as duas datas.'; err.style.display='block'; return; }
    if(sai<adm){ err.textContent='A data de saída não pode ser anterior à data de admissão.'; err.style.display='block'; return; }

    var dia=sal/30, linhas=[], total=0;
    function add(nome,det,v,neg){ if(v<=0) return; linhas.push([nome,det,v,neg]); total+=neg?-v:v; }

    var anos=anosCompletos(adm,sai);
    var diasAviso=Math.min(90,30+3*anos); // Lei 12.506/2011
    var fim=sai, avisoInd=0, desconto=0;
    if(mot==='sjc' && av==='indenizado'){ avisoInd=dia*diasAviso; fim=addDias(sai,diasAviso); }
    if(mot==='acordo'){ var meio=Math.round(diasAviso/2); avisoInd=dia*diasAviso/2; fim=addDias(sai,meio); }
    if(mot==='pedido' && av==='nao'){ desconto=sal; }

    var diasSaldo=Math.min(30,sai.getDate()); if(addDias(sai,1).getDate()===1) diasSaldo=30; if(sai.getFullYear()===adm.getFullYear()&&sai.getMonth()===adm.getMonth()) diasSaldo=Math.min(30,difDias(adm,sai)+1);
    var saldo=dia*diasSaldo;
    add('Saldo de salário', diasSaldo+' dia(s) trabalhados no mês da saída', saldo);

    if(avisoInd>0) add(mot==='acordo'?'Aviso prévio indenizado (metade)':'Aviso prévio indenizado', diasAviso+' dias de aviso pelo tempo de casa'+(mot==='acordo'?', pagos pela metade':''), avisoInd);

    var m13=0, v13=0, mf=0, vfp=0;
    if(mot!=='justa'){
      m13=meses13(adm,fim); v13=sal*m13/12;
      add('13º salário proporcional', m13+'/12 avos', v13);
      var anivAdm=addMeses(adm,12*anosCompletos(adm,fim));
      mf=Math.min(12,mesesFracao(anivAdm,fim)); vfp=sal*mf/12*4/3;
      add('Férias proporcionais + 1/3', mf+'/12 avos, com o adicional de 1/3', vfp);
    }
    if(venc>0) add('Férias vencidas + 1/3', venc+' período(s) completo(s) sem tirar férias', sal*venc*4/3);

    var pctMulta = mot==='sjc'?0.40:(mot==='acordo'?0.20:0);
    var mesesTot=difDias(adm,sai)/30.4375;
    var fgtsEst = isNaN(fgtsSaldo) ? sal*0.08*mesesTot*13/12 : fgtsSaldo;
    var fgtsResc = 0.08*(saldo+avisoInd+v13);
    var multa = pctMulta*(fgtsEst+fgtsResc);
    if(multa>0) add('Multa do FGTS ('+(pctMulta*100)+'%)', isNaN(fgtsSaldo)?'Estimada sobre os depósitos do período':'Calculada sobre o saldo informado', multa);
    if(desconto>0) add('Desconto do aviso não cumprido', '30 dias de salário que a empresa pode descontar', desconto, true);

    var t='';
    linhas.forEach(function(l){ t+='<tr'+(l[3]?' class="neg"':'')+'><td>'+l[0]+'<small>'+l[1]+'</small></td><td>'+(l[3]?'- ':'')+brl(l[2])+'</td></tr>'; });
    t+='<tr class="tot"><td>Total estimado da rescisão</td><td>'+brl(Math.max(0,total))+'</td></tr>';
    $('tabela').innerHTML=t;
    $('total').textContent=brl(Math.max(0,total));
    $('resumo').textContent=MOT[mot]+' · '+anos+' ano(s) completo(s) de empresa · salário de '+brl(sal);

    var saque = mot==='sjc'?'Você pode sacar o FGTS depositado (estimativa: '+brl(fgtsEst+fgtsResc)+'), além da multa.'
      : mot==='acordo'?'No acordo, você pode sacar até 80% do FGTS depositado (estimativa: '+brl(0.8*(fgtsEst+fgtsResc))+').'
      : 'Nesse tipo de saída, em regra, não há saque imediato do FGTS nem multa.';
    var seguro = mot==='sjc'?' Você pode ter direito ao <b>seguro-desemprego</b>, se cumprir os requisitos.':' Nesse tipo de saída, não há direito ao seguro-desemprego.';
    $('fgtsinfo').innerHTML='<b>FGTS e seguro-desemprego:</b> '+saque+seguro;
    // Prazo de 2 anos, contado do fim do contrato (com o aviso indenizado projetado) — Constituição, art. 7º, XXIX.
    var limite=new Date(fim.getFullYear()+2,fim.getMonth(),fim.getDate()), hoje=new Date(); hoje.setHours(0,0,0,0);
    var dl=limite.toLocaleDateString('pt-BR');
    $('prazo').innerHTML = hoje>limite
      ? '<b>Atenção ao prazo:</b> o prazo de 2 anos para cobrar diferenças da rescisão na Justiça terminou em '+dl+'. Ainda pode ser possível buscar o reconhecimento do tempo para a aposentadoria.'
      : '<b>Prazo para cobrar diferenças:</b> até '+dl+' (2 anos após o fim do contrato). Na ação, é possível cobrar valores dos últimos 5 anos.';

    var msg='Olá, Dr. Gabriel! Usei a calculadora de rescisão do site. Motivo: '+MOT[mot]+'. Tempo de empresa: '+anos+' ano(s). Estimativa: '+brl(Math.max(0,total))+'. Gostaria de conferir o cálculo completo da minha rescisão.';
    var link=WA+'?text='+encodeURIComponent(msg);
    document.querySelectorAll('.wa-res').forEach(function(a){ a.href=link; });
    $('res').style.display='block';
    $('res').scrollIntoView({behavior:'smooth',block:'start'});
    if(window.gtag){ try{ gtag('event','calculadora_rescisao',{motivo:mot}); }catch(e){} }
  });
})();
</script>`;
}

export function paginaCalculadora({ head, topo, rodape, cardAutor, SITE, SITE_URL, esc }) {
  const url = `${SITE_URL}/${CALC_SLUG}/`;
  const titulo = 'Calculadora de rescisão trabalhista grátis';
  const descricao = 'Calculadora de rescisão grátis: simule saldo de salário, aviso prévio, 13º, férias com 1/3 e multa de 40% do FGTS, conforme o motivo da saída.';
  const wa = (texto) => `${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;
  const waGeral = wa('Olá, Dr. Gabriel! Vim pela calculadora de rescisão do site e gostaria de conferir o cálculo completo da minha rescisão.');
  const waTrct = wa('Olá, Dr. Gabriel! Vim pela calculadora de rescisão do site e gostaria de enviar meu termo de rescisão para conferir se os valores estão corretos.');

  const faq = [
    ['A calculadora mostra o valor exato da minha rescisão?', 'Não. Ela faz uma estimativa das verbas principais, com base no último salário. Horas extras, adicionais, comissões, médias de valores variáveis e outras situações do contrato podem mudar bastante o resultado.'],
    ['Qual o prazo para a empresa pagar a rescisão?', 'A empresa deve pagar as verbas e entregar os documentos em até 10 dias contados do fim do contrato. Se atrasar, deve pagar uma multa no valor de um salário do empregado (CLT, art. 477, §§ 6º e 8º).'],
    ['Quanto tempo tenho para reclamar diferenças da rescisão?', 'O prazo para entrar com ação trabalhista é de 2 anos depois do fim do contrato, cobrando valores dos últimos 5 anos (Constituição, art. 7º, XXIX).'],
    ['Os valores já têm desconto de INSS e Imposto de Renda?', 'Não. A calculadora mostra valores brutos. Algumas verbas têm desconto de INSS e, conforme o valor, de Imposto de Renda.'],
  ];

  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: titulo, url, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', inLanguage: 'pt-BR', offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' }, author: { '@type': 'Person', name: SITE.autor } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: 'Calculadora de rescisão', item: url }] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];

  return `${head({ titulo: `${titulo} | ${SITE.nome}`, descricao, url, imagem: `${SITE_URL}/${CALC_SLUG}/capa.png`, jsonld, extra: `<style>${CSS_CALC.replace(/\n/g, '')}</style>` })}
<body>
${topo('calculadora')}
<main class="wrap">
  <nav class="crumbs" aria-label="Você está em"><a href="/">Início</a> › Calculadora de rescisão</nav>
  <header class="hero">
    <span class="tag">Direito do Trabalho</span>
    <h1>Calculadora de rescisão trabalhista</h1>
    <p class="lead">Saiu do emprego ou está prestes a sair? Simule de graça as principais verbas da rescisão: saldo de salário, aviso prévio, 13º, férias com 1/3 e multa do FGTS.</p>
  </header>
  <div class="layout">
    <section class="calc" aria-label="Calculadora">
      <h2>Faça a sua simulação</h2>
      <p class="sub">Leva menos de 1 minuto. Os dados ficam só no seu celular ou computador: nada é enviado ou guardado.</p>
      <div class="grid">
        <div class="f full"><label for="salario">Último salário bruto (R$)</label><input id="salario" inputmode="decimal" placeholder="Ex.: 1.800,00"><small>O valor do salário na carteira, antes dos descontos.</small></div>
        <div class="f"><label for="admissao">Data de admissão</label><input id="admissao" type="date"></div>
        <div class="f"><label for="saida">Último dia de trabalho</label><input id="saida" type="date"></div>
        <div class="f full"><label for="motivo">Como o contrato terminou?</label>
          <select id="motivo">
            <option value="sjc">Fui dispensado sem justa causa</option>
            <option value="pedido">Pedi demissão</option>
            <option value="acordo">Saí por acordo com a empresa</option>
            <option value="justa">Fui dispensado por justa causa</option>
          </select></div>
        <div class="f full" id="box-aviso"><label for="aviso">Aviso prévio</label><select id="aviso"></select></div>
        <div class="f"><label for="vencidas">Férias vencidas sem tirar</label>
          <select id="vencidas"><option value="0">Nenhuma</option><option value="1">1 período</option><option value="2">2 períodos</option></select>
          <small>Cada período é 1 ano completo de trabalho sem ter tirado as férias.</small></div>
        <div class="f"><label for="fgts">Saldo do FGTS (opcional)</label><input id="fgts" inputmode="decimal" placeholder="Se souber, ex.: 3.200,00"><small>Está no app do FGTS. Se deixar em branco, a calculadora estima.</small></div>
      </div>
      <button class="go" id="calcular" type="button">Calcular minha rescisão</button>
      <p class="err" id="err" role="alert"></p>

      <div id="res" aria-live="polite">
        <div class="res-head"><span>Estimativa da sua rescisão</span><strong id="total">R$ 0,00</strong><p id="resumo"></p></div>
        <table class="tab"><tbody id="tabela"></tbody></table>
        <p class="info" id="fgtsinfo"></p>
        <p class="info" id="prazo"></p>
        <p class="info">Valores <b>brutos e aproximados</b>, sem descontos de INSS e Imposto de Renda. Esta simulação não substitui o cálculo feito com os seus documentos.</p>
        <div class="miss">
          <h3>O que esta simulação não considera</h3>
          <ul>
            <li>horas extras, adicional noturno, insalubridade ou periculosidade;</li>
            <li>comissões, gorjetas e médias de valores variáveis;</li>
            <li>FGTS que a empresa deixou de depositar;</li>
            <li>período trabalhado sem carteira assinada;</li>
            <li>férias vencidas que devem ser pagas em dobro;</li>
            <li>multa por atraso no pagamento da rescisão e estabilidades (gestante, acidente de trabalho).</li>
          </ul>
          <p style="font-size:15px;margin:0 0 14px">Se algum desses pontos acontece no seu caso, o valor real pode ser bem diferente. O especialista <b>Dr. Gabriel Costa</b> faz o cálculo completo e explica cada verba para você.</p>
          <a class="btn wa-res" href="${esc(waGeral)}" target="_blank" rel="noopener">Quero o cálculo completo</a>
          <p class="hint">A mensagem já vai com o resumo da sua simulação.</p>
        </div>
      </div>
    </section>

    <div class="content">
      <h2 id="rescisao-paga">Já recebeu a rescisão? Confira se está certa</h2>
      <p>Muitos trabalhadores assinam o termo de rescisão (TRCT) sem saber se os valores estão corretos. Erros no aviso prévio, nas férias, nas médias de horas extras e no FGTS são comuns. Assinar o termo não impede de cobrar diferenças depois, dentro do prazo de 2 anos.</p>
      <p>Se quiser, envie o seu termo de rescisão e os contracheques para uma análise com o especialista.</p>
      <p><a class="btn" href="${esc(waTrct)}" target="_blank" rel="noopener">Enviar minha rescisão para análise</a></p>

      <h2 id="por-motivo">O que muda conforme o motivo da saída</h2>
      <div class="tbl"><table>
        <thead><tr><th>Verba</th><th>Sem justa causa</th><th>Pedido de demissão</th><th>Acordo</th><th>Justa causa</th></tr></thead>
        <tbody>
          <tr><td>Saldo de salário</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
          <tr><td>Aviso prévio indenizado</td><td>Sim, se não trabalhado</td><td>Não (pode ser descontado se não cumprir)</td><td>Metade</td><td>Não</td></tr>
          <tr><td>13º proporcional</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Não</td></tr>
          <tr><td>Férias proporcionais + 1/3</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Não</td></tr>
          <tr><td>Férias vencidas + 1/3</td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
          <tr><td>Multa do FGTS</td><td>40%</td><td>Não</td><td>20%</td><td>Não</td></tr>
          <tr><td>Saque do FGTS</td><td>Sim</td><td>Não</td><td>Até 80%</td><td>Não</td></tr>
          <tr><td>Seguro-desemprego</td><td>Se cumprir os requisitos</td><td>Não</td><td>Não</td><td>Não</td></tr>
        </tbody>
      </table></div>
      <p>No pedido de demissão, o 13º proporcional e as férias proporcionais são devidos mesmo com menos de 1 ano de empresa (Súmulas 157 e 261 do TST). Na justa causa, as férias proporcionais não são devidas (Súmula 171 do TST). No acordo, o aviso prévio indenizado e a multa do FGTS são pagos pela metade, as demais verbas são pagas por inteiro, o saque do FGTS fica limitado a 80% e não há seguro-desemprego (CLT, art. 484-A).</p>

      <h2 id="duvidas">Perguntas frequentes</h2>
      ${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n      ')}
      <p>Trabalhou sem registro? Leia também: <a href="/artigos/trabalhei-sem-carteira-assinada-quais-meus-direitos/">Trabalhei sem carteira assinada: quais são os meus direitos?</a></p>

      <hr>
      <h3>Fontes</h3>
      <ul>
        <li>Consolidação das Leis do Trabalho, arts. 146, 147, 477, 484-A e 487 — <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="noopener">texto no Planalto</a>.</li>
        <li>Lei nº 12.506/2011 (aviso prévio proporcional) — <a href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12506.htm" target="_blank" rel="noopener">texto no Planalto</a>.</li>
        <li>Lei nº 4.090/1962 (13º salário) e Lei nº 8.036/1990, art. 18, § 1º (multa do FGTS).</li>
        <li>Constituição Federal, art. 7º, XVII e XXIX.</li>
        <li>Tribunal Superior do Trabalho, Súmulas 157, 171 e 261.</li>
      </ul>
    </div>

    <p class="note">A calculadora tem caráter exclusivamente informativo, apresenta valores estimados e não substitui a análise individual do seu caso por um advogado.</p>
    ${cardAutor()}
    <section class="cta">
      <h2>Quer ter certeza do valor da sua rescisão?</h2>
      <p>O especialista Dr. Gabriel Costa faz o cálculo completo com os seus documentos e explica cada verba, para você saber exatamente o que tem a receber.</p>
      <a class="btn wa-res" href="${esc(waGeral)}" target="_blank" rel="noopener">Falar com o especialista</a>
    </section>
  </div>
</main>
${rodape()}
${scriptCalc(SITE.whatsapp)}
</body>
</html>`;
}
