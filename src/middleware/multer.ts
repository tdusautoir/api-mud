import multer from 'multer';

const MIME_TYPES: { [key: string]: number | string } = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        if (file.mimetype) {
            callback(null, `${file.originalname.split(' ').join('_').split(`.${MIME_TYPES[file.mimetype]}`)[0]}_${Date.now()}.${MIME_TYPES[file.mimetype]}`);
        }
    }
});

const multerUpload = multer({ storage }).single('image');

export default multerUpload;
