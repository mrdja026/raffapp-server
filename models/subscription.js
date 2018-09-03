import mongoose from 'mongoose';
import { POST_TYPES } from '../const';


const SubscriptionScheme = new mongoose.Schema({
    category: {
        enum: POST_TYPES,
    },
    userId: {
        type: String,
        required: true,
    }
});

export const Subscription = mongoose.model('Sub', SubscriptionScheme);

