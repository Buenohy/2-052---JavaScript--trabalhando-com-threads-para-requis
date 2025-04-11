// Importa a função para exibir a cotação textual na interface.
import selecionaCotacao from "./imprimeCotacao.js";

// --- Gráfico Dólar ---
// Obtém o elemento canvas e inicializa o gráfico Chart.js para Dólar.
const graficoDolar = document.getElementById('graficoDolar');
const graficoParaDolar = new Chart(graficoDolar, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dólar',
      data: [],
      borderWidth: 1
    }]
  },
});

// --- Funções Utilitárias ---
// Gera o horário atual formatado (HH:MM:SS) para usar como legenda no gráfico.
function gerarHorario() {
  let data = new Date();
  let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
  // console.log(horario); // Manter ou remover log conforme necessidade
  return horario;
}

// Adiciona novos dados (tempo, valor) a um gráfico Chart.js e atualiza sua exibição.
function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  })
  grafico.update();
}

// --- Worker Dólar ---
// Cria e inicializa o Web Worker para buscar a cotação do Dólar em segundo plano.
let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

// Define o que fazer ao receber dados do workerDolar: atualizar UI textual e gráfico.
workerDolar.addEventListener('message', event => {
  let tempo = gerarHorario();
  let valor = event.data.ask;
  selecionaCotacao('dolar', valor);
  adicionarDados(graficoParaDolar, tempo, valor);
})

// --- Gráfico Iene ---
// Obtém o elemento canvas e inicializa o gráfico Chart.js para Iene.
const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
      data: [],
      borderWidth: 1
    }]
  }
})

// --- Worker Iene ---
// Cria e inicializa o Web Worker para buscar a cotação do Iene em segundo plano.
let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');

// Define o que fazer ao receber dados do workerIene: atualizar UI textual e gráfico.
workerIene.addEventListener('message', event => {
  let tempo = gerarHorario();
  let valor = event.data.ask;
  adicionarDados(graficoParaIene, tempo,valor);
  selecionaCotacao('iene', valor);
})