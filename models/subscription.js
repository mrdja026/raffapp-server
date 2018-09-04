import mongoose from 'mongoose';
import { POST_TYPES } from '../const';


const SubscriptionScheme = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: POST_TYPES,
    },
    userId: {
        type: String,
        required: true,
    }
});

const Subscription = mongoose.model('Subscription', SubscriptionScheme);
export default Subscription;
