const express = require('express')
const next = require('next')
const faker = require('faker')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const products = [];
let nextId = 1;
for (let i = 0; i < 10; i++) {
  const product = {};
  product.id = nextId++;
  product.name = faker.commerce.productName();
  product.description = faker.lorem.sentences();
  product.price = faker.commerce.price(20, 100);
  products.push(product);
}

app.prepare()
  .then(() => {
    const server = express();

    server.get('/api/products', (req, res) => {
      res.json(products);
    });

    server.get('/api/product/:id', (req, res) => {
      res.json(products.find(p => p.id == req.params.id));
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    });
  });
