const express = require('express');
const { productsRouter, salesRouter } = require('./routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err);
  return res.status(500).json({ message: err.message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
