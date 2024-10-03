import cloudinary from '../config/cloudinary'; 
import { Readable } from 'stream';

export const uploadImageToCloudinary = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'avatars' },
      (error, result) => {
        if (error) {
          return reject(new Error("Failed to upload image to Cloudinary"));
        }
        resolve(result!.secure_url); 
      }
    );

 
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); 
    stream.pipe(uploadStream);
  });
};
