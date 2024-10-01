import { Document, Schema,  } from 'mongoose';

// Interface for Subscription document
export interface ISubscription extends Document {
  subsType: 'basic' | 'standard' | 'premium'; 
  subsStartDate: Date; 
  subsEndDate: Date;   
  amount: number;      
  appId: Schema.Types.ObjectId;
  isExpired:boolean;
  createdAt?: Date;    
  updatedAt?: Date;    
}

export interface SubscriptionPlan extends Document {
  _id: string; 
  name: 'basic' | 'standard' | 'premium'; 
  amount: number; 
  duration: '30 days' | '6 months' | '1 year';
}


