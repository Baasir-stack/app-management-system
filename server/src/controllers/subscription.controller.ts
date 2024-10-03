import { Request, Response } from 'express';
import Subscription from '../models/subscription.model';
import SubscriptionPlan from '../models/subscription.plan.model';
import catchAsyncError from "../middlewares/catchAsyncError";
import { formatDate } from '../utils/dateFormatter';
import { calculateEndDate } from '../utils/subscriptionHelper';


/**
 * @desc    purchase subscription for app
 * @route   POST /api/subs/create
 * @access  Private
 */
export const createSubscription = catchAsyncError(async (req: Request, res: Response) => {
    const { subsType, appId } = req.body; 

  
    const existingSubscription = await Subscription.findOne({ appId, isExpired: false });

    if (existingSubscription) {
        return res.status(400).json({
            success: false,
            message: 'Active subscription already exists for this app.',
        });
    }


    const subscriptionPlan = await SubscriptionPlan.findOne({ name: subsType });

    if (!subscriptionPlan) {
        return res.status(400).json({
            success: false,
            message: 'Invalid subscription type provided.',
        });
    }

    const amount = subscriptionPlan.amount; 
    const duration = subscriptionPlan.duration; 

  
    let endDate: Date;
    try {
        endDate = calculateEndDate(duration);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    const newSubscription = new Subscription({
        subsType,
        subsStartDate: new Date(), 
        subsEndDate: endDate,
        amount,
        appId,
        isExpired: false, 
    });

    await newSubscription.save();

    return res.status(201).json({
        success: true,
        message: 'New subscription created successfully',
        subscription: newSubscription,
    });
});

/**
 * @desc    purchase subscription for app
 * @route   PATCH /api/subs/update/:id
 * @access  Private
 */
export const updateSubscription = catchAsyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedSubscription = await Subscription.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedSubscription) {
        return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    res.status(200).json({
        success: true,
        message: 'Subscription updated successfully',
        subscription: updatedSubscription,
    });
});




/**
 * @desc    delete subscription
 * @route   DELETE /api/subs/delete/:id
 * @access  Private
 */

export const deleteSubscription = catchAsyncError(async (req: Request, res: Response) => {
    const { id } = req.params; 

    const deletedSubscription = await Subscription.findByIdAndDelete(id);

    if (!deletedSubscription) {
        return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    res.status(200).json({
        success: true,
        message: 'Subscription deleted successfully',
    });
});



/**
 * @desc    get specific subscription details
 * @route   GET /api/subs/getSubsById/:id
 * @access  Private
 */


export const getSubscriptionById = catchAsyncError(async (req: Request, res: Response) => {
    const { id } = req.params; 

    const subscriptions = await Subscription.find({ appId: id });

    if (subscriptions.length === 0) {
        return res.status(200).json({ success: true, subscriptions: [] }); 
    }

    const sortedSubscriptions = subscriptions.sort((a, b) => Number(a.isExpired) - Number(b.isExpired));

    
    const formattedSubscriptions = sortedSubscriptions.map(subscription => ({
        ...subscription.toObject(), 
        subsStartDate: formatDate(subscription.subsStartDate.toISOString()), 
        subsEndDate: formatDate(subscription.subsEndDate.toISOString()), 
    }));

    res.status(200).json({
        success: true,
        subscriptions: formattedSubscriptions,
    });
});