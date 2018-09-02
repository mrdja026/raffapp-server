import express from 'express';
import { checkAuth, responseHeader } from '../utls/apiUtils';
import Comment from '../models/comment';
const SORT_CONDITION = '-createdOn'
let CommentRouter = express.Router();


CommentRouter.post('/addNew', checkAuth, responseHeader, (req, res, next) => {
    let { content, topicId, parentCommentId = null, userId } = req.body;
    Comment.create({ topicId: topicId, content: content, parentCommentId: parentCommentId, userId: userId }, (err, comment) => {
        if (err) {
            console.log('COMMENT ERROR:', err);
            return next(err);
        } else {
            console.log('COMMENT success:', comment);
            return res.send({ ok: true, comment: comment });
        }
    });
});

CommentRouter.post('/getAll', checkAuth, responseHeader, (req, res, next) => {
    let { topicId } = req.body;
    Comment.find({ topicId: topicId }, null, { sort: SORT_CONDITION }, (error, comments) => {
        if (error) {
            return next(error);
        } else {
            return res.send({ ok: true, comments: comments });
        }
    });
});

export default CommentRouter;