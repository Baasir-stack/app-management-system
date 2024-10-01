import { Schema,model } from "mongoose";
import { ISubscription } from "../interfaces/subscription.interface";

const subscriptionSchema = new Schema<ISubscription >(
    {
      subsType: {
        type: String,
        enum: ['basic', 'standard', 'premium'], // Allowed subscription types
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
        ref: 'App', // Reference to the App model
        required: true,
      },
      isExpired: {
        type: Boolean,
        default: false, // Default to false when created
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );
  

  // Create Subscription model with schema and interface
const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;