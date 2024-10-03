import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';


const storage = multer.memoryStorage();


const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Only jpeg, jpg, and png files are allowed')); 
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, 
  },
});

export default upload;
