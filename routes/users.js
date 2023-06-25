const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  validateGetUserById, validateUpdateUser, validateUpdateAvatar,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:_id', validateGetUserById, getUserById);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;

// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар
