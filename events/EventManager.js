import { AppPostEventManager } from "./PostEventManager";

const _postEventManager = AppPostEventManager;
const handlers = [_postEventManager.init()]

class EventManager {
    constructor() {
    }
    initializeManagers = async () => {
        let promise = new Promise(async (resolve, reject) => {
            await Promise.all(handlers).then(() => {
                return resolve(true);
            }).catch((error) => {
                return reject(error);
            });
        });
        return promise;
    }
}

export const AppEventManager = new EventManager();