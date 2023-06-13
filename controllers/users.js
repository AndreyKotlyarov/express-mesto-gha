const userModel = require('../models/user');

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({
      message: 'Произошла ошибка',
      err: err.message,
      stack: err.stack,
    }));
};
const getUserById = (req, res) => {
  userModel
    .findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => res.status(404).send({
      message: 'Пользователь не найден',
      err: err.message,
      stack: err.stack,
    }));
};
const createUser = (req, res) => {
  userModel
    .create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => res.status(404).send({
      message: 'Ошибка валидации',
      err: err.message,
      stack: err.stack,
    }));
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
      res.status(201).send(user);
    })
    .catch((err) => res.status(400).send({
      message: 'Ошибка валидации',
      err: err.message,
      stack: err.stack,
    }));
};
const updateAvatar = (req, res) => {
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    )
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => res.status(400).send({
      message: 'Ошибка валидации',
      err: err.message,
      stack: err.stack,
    }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
