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
            console.log('Firebase  init error',error);
        }
    }

    sendNotification = (message) => {
        console.log('Notif to send', message);
        admin.messaging().send(message).then((result)=>{
            console.log('result', result);
        }).catch((error) => {
            console.log('Error sending message:', error);
          });
    }
}

export const AppFirebaseHandler = new FirebaseHandler();