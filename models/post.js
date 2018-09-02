import mongoose from 'mongoose';
import moment from 'moment';
import Comment, { CommentSchema } from './comment';
import User from './user';
import { POST_TYPES } from '../const';
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    createdOn: {
        type: Number,
    },
    category: {
        type: String,
        required: true,
        enum: POST_TYPES,
    },
    score: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
    },
    textContent: {
        type: String,
        trim: true,
    },
    mediaContent: {
        type: String,
        trim: true,
    },
    mediaContentThumb: {
        type: String,
        trim: true,
    },
    locked: {
        type: Number,
    },
    comments: [],

});

PostSchema.pre('save', function (next) {
    let post = this;
    post.createdOn = moment().valueOf();
    next();
})

const Post = mongoose.model('Post', PostSchema);
export default Post;