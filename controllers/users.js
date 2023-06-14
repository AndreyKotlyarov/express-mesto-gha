const mongoose = require('mongoose');
const userModel = require('../models/user');

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({
      message: `'Произошла ошибка на сервере: ${err.message}'`,
    }));
};
const getUserById = (req, res) => {
  userModel
    .findById(req.params.userId)
    .orFail(() => { throw new Error(); })
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({
      message: 'Пользователь не найден',
    }));
};
const createUser = (req, res) => {
  userModel
    .create(req.body)
    .then((user) => {
      res.status(200).send(user);
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
const updateUser = (req, res) => {
  userModel
    .findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about,
      },
      { new: true, runValidators: true },
    )
    .then((user) => {
      res.status(200).send(user);
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
const updateAvatar = (req, res) => {
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    )
    .then((user) => {
      res.status(200).send(user);
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
