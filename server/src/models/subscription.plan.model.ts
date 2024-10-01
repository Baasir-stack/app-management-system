import { Schema,model } from "mongoose";
import { SubscriptionPlan } from "../interfaces/subscription.interface";

const subscriptionPlanSchema = new Schema<SubscriptionPlan>({
    name: {
      type: String,
      required: true,
      enum: ['basic', 'standard', 'premium'], 
    },
    amount: {
      type: Number,
      required: true,
    },
    duration: {
        type: String,
        required: true,
        enum: ['30 days', '6 months', '1 year'], 
    },

  });
  
  
  const SubscriptionPlan = model<SubscriptionPlan>('SubscriptionPlan', subscriptionPlanSchema);
  export default SubscriptionPlan;
 