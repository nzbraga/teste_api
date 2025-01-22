const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Rota principal
app.get('/', (req, res) => {
    res.send('Server On, Eu amo minha esposa');
});

// Rota de status
app.get('/status', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
