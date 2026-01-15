require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/error-handler');
const productRoute = require('./routes/product.route');
const connectDB = require('./db/connect-db');

const app = express();

app.use(express.json());

app.use('/api/product', productRoute);

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}...`);
  });
};

startServer();
