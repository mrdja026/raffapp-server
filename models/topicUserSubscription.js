import mongoose from 'mongoose';
import { POST_TYPES } from '../const';


const TopicUserSubscriptionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: POST_TYPES
    },
    userId: {
        type: String,
        required: true,
        trim: true,
    }
});

export default TopicUserSubscription = mongoose.model(TopicUserSubscriptionSchema, 'TopicUserSubscription');