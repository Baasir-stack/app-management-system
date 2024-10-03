import { Schema,model } from "mongoose";
import { ISubscription } from "../interfaces/subscription.interface";

const subscriptionSchema = new Schema<ISubscription >(
    {
      subsType: {
        type: String,
        enum: ['basic', 'standard', 'premium'], 
        required: true,
      },
      subsStartDate: {
        type: Date,
        required: true,
      },
      subsEndDate: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      appId: {
        type: Schema.Types.ObjectId,
        ref: 'App', 
        required: true,
      },
      isExpired: {
        type: Boolean,
        default: false, 
      },
    },
    {
      timestamps: true, 
    }
  );
  

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;