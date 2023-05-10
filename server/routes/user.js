const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/validation/image');
const {
    handleChangeAvatar,
    handleChangeUsername,
    handleChangePassword,
} = require('../controllers/userController');

router.post(
    '/avatar',
    verifyAccessToken,
    upload.single('avatar'),
    handleChangeAvatar
);

router.put('/username', verifyAccessToken, handleChangeUsername);
router.put('/password', verifyAccessToken, handleChangePassword);

module.exports = router;
