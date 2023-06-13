const cardModel = require('../models/card');

const getCards = (req, res) => {
  cardModel
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({
      message: 'Произошла ошибка',
      err: err.message,
      stack: err.stack,
    }));
};
const createCard = (req, res) => {
  cardModel
    .create(req.body)
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => res.status(404).send({
      message: 'Ошибка валидации',
      err: err.message,
      stack: err.stack,
    }));
};
const deleteCard = (req, res) => {
  cardModel
    .findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `${err.name}` }));
};
const setLike = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `${err.name}` }));
};
const deleteLike = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `${err.name}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
};
