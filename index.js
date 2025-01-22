const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
// Rota principal
app.get('/', (req, res) => {
    res.send('Server On, Eu amo minha esposa');
=======
// Cria um servidor HTTP simples
const server = http.createServer((req, res) => {
    // Configura o cabeçalho da resposta para indicar JSON
    res.setHeader('Content-Type', 'application/json');

    // Verifica a rota e responde de acordo
    if (req.method === 'GET' && req.url === '/') {
        res.send('Server On')
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'API rodando com sucesso!' }));
    } else if (req.method === 'GET' && req.url === '/status') {
        res.statusCode = 200;
        res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }
>>>>>>> e3bdda02b20f38268d7008ffab9b495312c66975
});

// Rota de status
app.get('/status', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
