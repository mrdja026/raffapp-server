import admin from 'firebase-admin';

const google_json = require('../config/firebase/rafapp_cred.json')

class FirebaseHandler {
    constructor() {

    }

    init = () => {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(google_json),
                databaseURL: 'https://rafappv1.firebaseio.com/',
            });
            console.log('Firebase initialited successfully');
        } catch (error) {
            console.log('Firebase  init error', error);
        }
    }

    sendNotification = (message) => {
        //TODO: Populate data for all apropriate fields,
        let mrdjan = {
            notification: {
                title: message.data.title,
                body: 'TEST'
            },
            data: {
                score: '850',
                time: '2:45'
            },
            token: message.token,
        };
        admin.messaging().send(mrdjan).then((result) => {
            console.log('result', result);
        }).catch((error) => {
            console.log('Error sending message:', error);
        });
    }
}

export const AppFirebaseHandler = new FirebaseHandler();