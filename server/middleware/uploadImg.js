import multer from 'multer';

const uploadImg = multer({
  limits: { fileSize: 1000000 }, // maximum: 1MB
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(null, true);
  },
});

export default uploadImg;
