async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
  const conectaTraduziado = await conecta.json();
  postMessage(conectaTraduziado.USDBRL);
}

addEventListener('message', () => {
  conectaAPI();
  setInterval(() => conectaAPI(), 5000)
})

export default workerDolar;