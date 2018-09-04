import express from 'express';
import Subscription from '../models/subscription';
import { checkAuth, responseHeader } from '../utls/apiUtils';

const SubRouter = express.Router();


SubRouter.post('/registerTopicSubscription', checkAuth, responseHeader, (req, res, next) => {
    let { category } = req.body;
    let { userId } = req.session;
    console.log("Category", category, ' Userid', userId);
    Subscription.create({ userId: userId, category: category }, (error, result) => {
        if (error) {
            return next(error);
        } else {
            console.log(result);
            return res.send({ ok: true });
        }
    })
});

SubRouter.post('/cancelTopicSubscription', checkAuth, responseHeader, (req, res, next) => {
    let { userId, category } = req.body;
    Subscription.remove({ userId: userId, category: category }, (error, result) => {
        if (error) {
            return next(error);
        } else {
            return res.send({ ok: true });
        }
    })
});

SubRouter.post('/getMySub', checkAuth, responseHeader, (req, res, next) => {
    let { userId } = req.session;
    let { category } = req.body;
    Subscription.findOne({ userId: userId, category: category }, (error, result) => {
        if (error) {
            return next(error);
        } else {
            return res.send({ ok: true, sub: result });
        }
    });
});

export default SubRouter;