import mongoose from 'mongoose';
import { POST_TYPES } from '../const';


const SubscriptionScheme = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: POST_TYPES,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
    }
});

const Subscription = mongoose.model('Subscription', SubscriptionScheme);
export default Subscription;
