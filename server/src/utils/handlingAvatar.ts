import cloudinary from '../config/cloudinary'; // Adjust the path as necessary
import { Readable } from 'stream';

export const uploadImageToCloudinary = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'avatars' },
      (error, result) => {
        if (error) {
          return reject(new Error("Failed to upload image to Cloudinary"));
        }
        resolve(result!.secure_url); // Return the secure URL
      }
    );

    // Create a Readable stream from the buffer and pipe it to Cloudinary
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signal the end of the stream
    stream.pipe(uploadStream);
  });
};
