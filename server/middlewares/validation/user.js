const { check, validationResult } = require('express-validator');

exports.validateUserRegister = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username is required!')
        .isLength({ min: 3, max: 10 })
        .withMessage('Username must be within 3 to 10 characters!!!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required!!!')
        .isLength({ min: 7, max: 20 })
        .withMessage('Password must be within 8 to 20 characters!!!'),
    check('repwd')
        .trim()
        .not()
        .isEmpty()
        .custom((repwd, { req }) => {
            if (repwd !== req.body.password) {
                throw new Error('Passwords must be the same!');
            }
            return true;
        }),
    check('io_username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('io_username is required'),
    check('io_key').trim().not().isEmpty().withMessage('io_key is required!'),
];

exports.validateUserLogin = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username is required!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required!!!'),
];

exports.validateResult = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();
    const err = result[0].msg;
    res.json({ success: false, message: err });
};
