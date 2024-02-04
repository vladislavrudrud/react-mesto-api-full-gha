const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getUserById,
  updateAvatar,
  editProfile,
  getCurrentUser,
} = require('../controllers/users');
const { REGEX } = require('../utils/constants');

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(REGEX).required(),
  }),
}), updateAvatar);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), editProfile);

usersRouter.get('/me', getCurrentUser);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

usersRouter.get('/', getAllUsers);

module.exports = usersRouter;
