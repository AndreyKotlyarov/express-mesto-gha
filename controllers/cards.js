const mongoose = require('mongoose');
const cardModel = require('../models/card');

const getCards = (req, res) => {
  cardModel
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({
      message: `'Произошла ошибка на сервере: ${err.message}'`,
    }));
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  cardModel
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Ошибка валидации' });
        return;
      }
      res.status(500).send({
        message: `'Произошла ошибка на сервере: ${err.message}'`,
      });
    });
};
const deleteCard = (req, res) => {
  cardModel
    .findByIdAndRemove(req.params.cardId)
    .orFail(() => { throw new Error(); })
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(404).send({ message: `${err.name}` }));
};
const setLike = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    .orFail(() => { throw new Error(); })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.name}` });
      } else {
        res.status(404).send({ message: `${err.name}` });
      }
    });
};
const deleteLike = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .orFail(() => { throw new Error(); })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.name}` });
      } else {
        res.status(404).send({ message: `${err.name}` });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
};
