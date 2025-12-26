const express = require('express');
const errorHandler = require('./middlewares/error-handler');
const productRoute = require('./routes/product.route');

const port = 5000;
const app = express();

app.use(express.json());

app.use('/api/product', productRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
