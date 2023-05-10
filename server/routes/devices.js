const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../middlewares/authMiddleware');
const device = require('../controllers/deviceController');

router.use(verifyAccessToken);

router.get('/amount', device.handleGetDevices);
router.get('/:id', device.handleGetDevice);
router.get('/:type/all', device.handleGetAll);


router.put('/:type/status', device.handleChangeAllStatus);
router.put('/status/:id', device.handleChangeStatus);
router.put('/mode/:id', device.handleChangeMode);
router.put('/value/:id', device.handleChangeValue);

router.put('/name/:id', device.handleChangeName);
router.put('/position/:id', device.handleChangePosition);

module.exports = router;
