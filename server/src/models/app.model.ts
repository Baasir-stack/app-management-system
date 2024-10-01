import  { Schema, model } from 'mongoose';
import { IApp } from '../interfaces/app.interface';
// Schema for App
const appSchema = new Schema<IApp>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      desc: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );


  // Create App model with schema and interface
const App = model<IApp>('App', appSchema);

export default App;