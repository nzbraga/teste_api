// Importa o módulo HTTP nativo do Node.js
const http = require('http');

// Define uma porta para o servidor
const PORT = process.env.PORT || 3000;

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
});

// Faz o servidor escutar na porta definida
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
