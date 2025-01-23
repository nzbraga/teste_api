const express = require('express');
const venom = require('venom-bot');

const app = express();
app.use(express.json());

let client;
// reiniciar deply

// Inicializa o venom-bot
venom
  .create({
    session: 'teste', // Nome da sessão
  })
  .then((venomClient) => {
    client = venomClient;
    console.log('Bot iniciado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao iniciar o bot:', error);
  });

// Rota principal para testar
app.get('/', (req, res) => {
  res.send('API do WhatsApp rodando!');
});

// Rota para enviar mensagens
app.post('/send-message', async (req, res) => {
  const { number, message } = req.body;

  if (!client) {
    return res.status(500).send('Bot não está pronto.');
  }

  try {
    await client.sendText(number, message);
    res.send('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).send('Erro ao enviar mensagem.');
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
