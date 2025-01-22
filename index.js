const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Rota simples
app.get('/', (req, res) => {
    res.send('Hello, Cloud Run!');
});

// Inicia o servidor na porta 8080
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
