async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/last/JPY-BRL');
  const conectaTraduziado = await conecta.json();
  postMessage(conectaTraduziado.JPYBRL);
}

addEventListener('message', () => {
  conectaAPI();
  setInterval(() => conectaAPI(), 5000)
})