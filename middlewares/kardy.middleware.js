const createError = require('http-errors');
const multer = require('multer');

const kadryUploadJSON = multer({
    storage: multer.diskStorage({
        destination: 'public/kadry_files/',
    }),
    limits: { fileSize: 100 * 1024 /* bytes */ },
    fileFilter: (req, file, callback) => {
        if (!['application/json'].includes(file.mimetype)) {
            return callback(createError.BadRequest("File type is not allowed"));
        }

        callback(null, true);
    }
}).single('file');


module.exports = {
    kadryUploadJSON
}