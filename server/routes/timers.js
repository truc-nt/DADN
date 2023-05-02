const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../middlewares/authMiddleware');
const {
    handleGetTimers,
    handleAddTimer,
    handleChangeTimerStatus,
} = require('../controllers/timerController');

router.use(verifyAccessToken);
//router.get('/:type', verifyAccessToken)
router.get('/:deviceId', handleGetTimers);
router.post('/:deviceId', handleAddTimer);
router.patch('/:timerId', handleChangeTimerStatus);

module.exports = router;
