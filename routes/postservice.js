import express from 'express';
import { checkAuth, responseHeader, HTTP_RA_EXCEPTION } from '../utls/apiUtils';
import Post from '../models/post';
import { generalUpload } from '../utls/cloudinaryUtils';
import moment from 'moment';
const SORT_CONDITION = '-createdOn'

const PostRouter = express.Router();

PostRouter.post('/getAll', checkAuth, responseHeader, (req, res, next) => {
    let { skip, take, category } = req.body;
    Post.find({ category: category }, null, { sort: SORT_CONDITION, skip: skip, limit: take }).populate('userId').exec((err, result) => {
        if (err) {
            return next(error);
        } else {
            return res.send({ ok: true, items: result });
        }
    });
});

PostRouter.post('/getById', checkAuth, responseHeader, (req, res, next) => {
    let { id } = req.body;
    Post.findOne({ _id: id }).populate('userId').exec((err, result) => {
        if (err) {
            return next(err);
        }
        return res.send({ ok: true, post: result });
    })
});

PostRouter.post('/savePost', checkAuth, responseHeader, (req, res, next) => {
    console.log('Save post lol?');
    let { title, textContent, userId, category, mediaContent } = req.body;
    Post.create({ createdOn: moment().valueOf(), title: title, textContent: textContent, userId: userId, category: category }, (error, post) => {
        if (error) {
            console.log('Errorr', error);
            return next(error);
        } else {
            //TODO: ima neki bug kada se png uploaduje ? maybe
            if (mediaContent) {
                console.log('media contan', mediaContent);
                let { b64, type } = mediaContent;
                let base64String = 'data:' + type + ';base64,' + b64;
                try {
                    generalUpload(base64String).then(result => {
                        console.log('Post media result', result);
                        let { url } = result;
                        const KEY_SPLIT = 'upload/'
                        let urlPaths = url.split(KEY_SPLIT);
                        let thumb = urlPaths[0] + KEY_SPLIT + '/w_60,h_60/' + urlPaths[1];
                        Post.findOneAndUpdate({ _id: post._id }, { mediaContent: result.url, mediaContentThumb: thumb }, { new: true, owerWrite: false }, (error, post) => {
                            if (error) {
                                return next(error);
                            } else {
                                return res.send({ ok: true, post: post });
                            }
                        })
                    })
                } catch (error) {
                    console.log('Error while uploading what?');
                    return next(error);
                }
            } else {
                return res.send({ ok: true, post: post });
            }
        }
    });
});
const UP_VOTE = '+';
const DOWN_VOTE = '-'
PostRouter.post('/vote', checkAuth, responseHeader, (req, res, next) => {
    //TODO: Voting sistem da dozvoli useru da da samo + - 0, tj da se napravi kolekcija userPostVote, i tu gleda sta sme da radi itd itd;
    let { type, id } = req.body;
    if (type != UP_VOTE && type != DOWN_VOTE)
        return next(new Error('Wrong voting type provided'));
    Post.findById(id, (error, result) => {
        if (error) {
            return next(error);
        } else {
            let newScore = null;
            let { score } = result;
            newScore = type == UP_VOTE ? score + 1 : score - 1;
            result.score = newScore;
            result.save((error, update) => {
                if (error) {
                    return next(error);
                } else {
                    return res.send({ ok: true, result: update });
                }
            });
        }
    })
});



export default PostRouter;