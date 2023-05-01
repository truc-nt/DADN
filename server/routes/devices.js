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
    handleChangeValue,
} = require('../controllers/deviceController');

router.use(verifyAccessToken);

router.get('/amount', handleGetDevices);

//router.get('/:type/amount', handleGetAmount);
router.get('/:type/all', handleGetAll);

router.put('/:type/status', handleChangeAllStatus);
router.put('/status/:id', handleChangeStatus);
router.put('/mode/:id', handleChangeMode);
router.put('/value/:id', handleChangeValue);

module.exports = router;
