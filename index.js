const express = require('express');
const venom = require('venom-bot');

const app = express();
app.use(express.json());

// Rota para enviar mensagem
app.post('/send-message', (req, res) => {
  const { client, number, message } = req.body;

  if (!client) {
    return res.status(500).send('no client detected');
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
