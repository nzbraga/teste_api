const express = require('express');
const venom = require('venom-bot');

const app = express();
app.use(express.json());

let clientReady = false; // Variável para rastrear o status do cliente

// Cria o cliente do venom-bot
venom
  .create({
    session: 'teste',
    multidevice: true, // Usar multi-dispositivos
    headless: false, // Para abrir o navegador e exibir o QR Code
    useChrome: true,
    catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
      console.log('QR Code:', asciiQR); // Exibe o QR no terminal
      console.log('Abra este link no navegador para escanear o QR:', urlCode);
    },
  })
  .then((venomClient) => {
    client = venomClient;
    clientReady = true; // Atualiza o status quando o cliente estiver pronto
    console.log('Bot inicializado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao inicializar o venom-bot:', error);
  });

// Rota para enviar mensagem
app.post('/send-message', (req, res) => {
  const { number, message } = req.body;

  if (!clientReady) {
    return res.status(500).send('Bot não está pronto. Tente novamente em alguns segundos.');
  }

  client
    .sendText(number, message)
    .then(() => res.send('Mensagem enviada com sucesso!'))
    .catch((error) => {
      console.error('Erro ao enviar mensagem:', error);
      res.status(500).send('Erro ao enviar mensagem.');
    });
});

// Rota para verificar o status do bot
app.get('/status', (req, res) => {
  if (clientReady) {
    res.send('Bot está pronto!');
  } else {
    res.status(500).send('Bot ainda não está pronto.');
  }
});

// Rota para testar a API
app.get('/', (req, res) => {
  res.send('API rodando');
});

// Inicia o servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
