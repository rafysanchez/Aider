const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
}); 