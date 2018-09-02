import express from 'express';
import Subscription from '../models/subscription';
import { checkAuth, responseHeader, HTTP_UNAUTHORIZED, HTTP_RA_EXCEPTION } from '../utls/apiUtils';

const SubRouter = express.Router();


SubRouter.post('/registerSubscription', checkAuth, responseHeader, (req, res, next) => {

});

SubRouter.post('/cancelSubscription', checkAuth, responseHeader, (req, res, next) => {

});

export default SubRouter;