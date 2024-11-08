const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images');
    },
    filename: (req, file, callback) => {
        const fileName = Date.now() + path.extname(file.originalname);
        callback(null, fileName);
    }
});

const imageUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            const error = new Error(`Only ${allowedMimeTypes.join(', ')} formats are allowed for images!`);
            error.status = 400;
            callback(error, false);
        }
    }
});

module.exports = { imageUpload };
