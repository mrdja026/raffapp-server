import mongoose from 'mongoose';
import moment from 'moment';

export const CommentSchema = new mongoose.Schema({
    topicId: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
    },
    content: {
        required: true,
        type: String,
        trim: true,
    },
    parentCommentId: {
        type: String,
        trim: true,
    },
    createdOn: {
        type: Number,
    },
    score: {
        type: Number,
    },
    deleted: {
        type: Number,
        enum: [1, 0]
    }
});

CommentSchema.pre('save', function (next) {
    let comment = this;
    comment.createdOn = moment().valueOf();
    next();
});
const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;