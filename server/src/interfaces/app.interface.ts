import { Document, Schema,  } from 'mongoose';

// Interface for App document
export interface IApp extends Document {
  title: string;
  desc: string;
  status: 'active' | 'inactive';
  userId: Schema.Types.ObjectId; // Reference to User
  createdAt?: Date; // Optional
  updatedAt?: Date; // Optional
}

// Static methods for App model
// export interface AppModel extends Model<IApp> {

// }
