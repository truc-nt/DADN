const multer = require('multer')
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else cb('invaid image files', false)
}

exports.upload = multer({storage, fileFilter})

