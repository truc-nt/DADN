const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../middlewares/authMiddleware');
const timer = require('../controllers/timerController');

router.use(verifyAccessToken);

router.get('/:deviceId', timer.handleGetTimers);
router.post('/:deviceId', timer.handleAddTimer);
router.delete('/:timerId', timer.handleDeleteTimer);
router.patch('/:timerId', timer.handleChangeTimerStatus);

module.exports = router;
