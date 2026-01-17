const config = require('./config');
const express = require('express');
const errorHandler = require('./middlewares/error-handler');
const checkAuth = require('./middlewares/check-auth');
const productRoute = require('./routes/product.route');
const authRoute = require('./routes/auth.route');
const connectDB = require('./db/connect-db');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/product', checkAuth, productRoute);
app.use('/api/auth', authRoute);

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}...`);
  });
};

startServer();
