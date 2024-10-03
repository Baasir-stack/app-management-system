import { Document, Schema,  } from 'mongoose';


export interface IApp extends Document {
  title: string;
  desc: string;
  status: 'active' | 'inactive';
  userId: Schema.Types.ObjectId; 
  createdAt?: Date; 
  updatedAt?: Date; 
}

