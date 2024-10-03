import  { Schema, model } from 'mongoose';
import { IApp } from '../interfaces/app.interface';

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
        ref: 'User', 
        required: true,
      },
    },
    {
      timestamps: true, 
    }
  );


const App = model<IApp>('App', appSchema);

export default App;