const BadRequestError = require('../errors/badrequesterror');
const ForbiddenError = require('../errors/forbiddenerror');
const NotFoundError = require('../errors/notfounderror');
const Card = require('../models/card');
const { OK, CREATED } = require('../utils/constants');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.status(CREATED).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка при создании публикации!'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Публикации не найдены!');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Публикацию удалить невозможно!');
      }
      card.deleteOne()
        .then(() => res.status(OK).send({ message: 'Публикация удалена!' }))
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Ошибка! Идентификатор недопустим!'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Публикации не найдены!');
      }
      return res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Публикации не найдены!');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  dislikeCard,
  likeCard,
  deleteCard,
  createCard,
  getAllCards,
};
