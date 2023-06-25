const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  validateGetUserById, validateGetUserInfo, validateUpdateUser, validateUpdateAvatar,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/:userId', validateGetUserById, getUserById);
router.get('/me', validateGetUserInfo, getUserInfo);

router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;

// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар
