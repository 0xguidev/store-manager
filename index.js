const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const Product = require('./controllers/Product');
const sale = require('./controllers/Sale');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Product.create);
app.get('/products', Product.getAll);
app.get('/products/:id', Product.findById);
app.put('/Products/:id', Product.update);
app.delete('/products/:id', Product.deleteProduct);

app.post('/sales', sale.create);
app.get('/sales', sale.getAll);
app.get('/sales/:id', sale.getById);
app.put('/sales/:id', sale.update);
app.delete('/sales/:id', sale.deleted);

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});