const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const userModel = require('../models/user');

const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};
const getUserById = (req, res, next) => {
  userModel
    .findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};
const createUser = (req, res, next) => {
  userModel
    .create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};
const updateUser = (req, res, next) => {
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
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};
const updateAvatar = (req, res, next) => {
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
