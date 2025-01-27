const express = require('express');
const venom = require('venom-bot');

const app = express();
app.use(express.json());

let client; // Variável para armazenar o cliente do venom
let clientReady = false; // Variável para rastrear o status do cliente

// Cria o cliente do venom-bot
venom
  .create({
    session: 'teste',
    multidevice: true, // Usar multi-dispositivos
    headless: false, // Abre o navegador para exibir o QR Code
    useChrome: true,
    catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
      console.log('---------------------------');
      console.log('QR Code gerado com sucesso!');
      console.log('QR Code ASCII:', asciiQR); // Exibe o QR em ASCII no terminal
      console.log('Escaneie o QR no link:', urlCode);
      console.log('---------------------------');
    },
    logQR: true, // Garante que o QR seja exibido no console
  })
  .then((venomClient) => {
    client = venomClient;
    console.log('Bot inicializado com sucesso! Aguardando escaneamento do QR Code...');
    
    // Monitora quando o cliente está realmente conectado
    client.onStateChange((state) => {
      console.log('Estado do cliente:', state);
      if (state === 'CONNECTED') {
        clientReady = true;
        console.log('Bot conectado e pronto para uso!');
      }
    });
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
