import multer from "multer";


// FILES STORAGE
const storage = multer.diskStorage(
    {
        destination: function(req, file, cb) {
            cb(null, 'public/assets')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }
    }
)


export const upload = multer({ storage })