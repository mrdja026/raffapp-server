import { AppFirebaseHandler } from "../firebase/firebase";
import Subscription from "../models/subscription";
import admin from 'firebase-admin';

class PostEventManager {
    constructor() {
        this.initialized = false;
    }

    getType = () => {
        return 'POST';
    }

    getInitialized = () => {
        return this.initialized;
    }

    init = () => {
        return new Promise((resolve, reject) => {
            try {
                //Firebase mambo jambo
                this.initialized = true;
                AppFirebaseHandler.init();
                return resolve(true);
            } catch (error) {
                return reject(error);
            }
        });
    }

    postCreatedEvent = async (category, userId) => {
        let usersSubed = await Subscription.find({ category: category }).populate('userId').exec();
        usersSubed.forEach(userSubed => {
            let { userId } = userSubed;
            let { deviceToken } = userId;

            AppFirebaseHandler.sendNotification({ data: {sta:'Sta', ne:'neee',time: new Date().toISOString()},  token: deviceToken });
        })
    }

    postComentedEvent = async () => {

    }

    postUpvotedEvent = async () => {

    }

    postDeletedEvent = async () => {

    }
}

export const AppPostEventManager = new PostEventManager();
