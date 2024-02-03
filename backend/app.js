require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const router = require('./routes');
const defaultError = require('./errors/defaulterror');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { REGEX } = require('./utils/constants');
const NotFoundError = require('./errors/notfounderror');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(REGEX),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.use(auth);
app.use(router);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError('Такого адреса не существует.'));
});

app.use(errorLogger);
app.use(defaultError);

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(`${MONGO_URL}`)
  .then(() => console.log('Подключено'))
  .catch(() => console.log('Не подключено'));

app.listen(PORT, () => {
  console.log('Сервер запущен на 3000 порту');
});
