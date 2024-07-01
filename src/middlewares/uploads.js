const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const { originalname } = file
    if (!originalname.match(/\.(jpg|png|jpeg)$/i)) {
        // 1: throw ra loi
        // 2: true|false , true -> loi -> van luu
        return cb(new Error(`Không hổ trợ ${path.extname(originalname)}`), false)
    }
    // khong co loi luu
    cb(null, true)
}

const limits = {
    fileSize: 5 * 1024 * 1024,
    files: 5
}

const uploadMiddleware = multer({ storage, fileFilter, limits })
module.exports = uploadMiddleware
