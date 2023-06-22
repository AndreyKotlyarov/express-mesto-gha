const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = require('./routes');
const { errorsHandler } = require('./errors/errorsHandler');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(limiter);
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true })
  .then(() => console.log('Подключение к базе данных успешно'))
  .catch((err) => {
    console.log('Ошибка подключения к базе данных', err);
    process.exit(1);
  });

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64874bc412f5e78f3a143d7e', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(router);

app.use(errorsHandler);
app.listen(PORT, () => {
  console.log('Сервер запущен на порту 3000');
});
