const express = require('express');
const errorHandler = require('./middlewares/error-handler');

const port = 5000;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('lets go baby');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
