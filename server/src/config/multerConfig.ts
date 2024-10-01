import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// Set storage engine to memory
const storage = multer.memoryStorage();

// File filtering to accept only certain file types (optional)
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // No error, pass `null` for success
  } else {
    cb(new Error('Only jpeg, jpg, and png files are allowed')); // Pass error instance for failure
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit files to 5MB
  },
});

export default upload;
