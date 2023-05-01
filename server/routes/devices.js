const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../middlewares/authMiddleware');
const {
    handleGetDevices,
    handleGetAmount,
    handleGetAll,
    handleChangeAllStatus,
    handleChangeStatus,
    handleChangeMode,
} = require('../controllers/deviceController');

router.use(verifyAccessToken);

router.get('/amount', handleGetDevices);

router.get('/:type/amount', handleGetAmount);
router.get('/:type/all', handleGetAll);

router.put('/:type/status', handleChangeAllStatus);
router.put('/status/:type/:id', handleChangeStatus);
router.put('/mode/:type/:id', handleChangeMode);

module.exports = router;
