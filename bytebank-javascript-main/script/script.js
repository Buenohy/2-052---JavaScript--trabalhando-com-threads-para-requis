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
setInterval(() => conectaAPI(), 5000)
async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
  const conectaTraduziado = await conecta.json();
  let tempo = gerarHorario();
  let valor = conectaTraduziado.USDBRL.ask;
  adicionarDados(graficoParaDolar, tempo,valor)
}

function gerarHorario() {
  let data = new Date();
  let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
  console.log(horario);
  return horario;
}

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  })
  grafico.update();

}