import { cloud_name, cloud_api_key, cloud_api_secret, app_db_path } from "./keys";
import { app_api_secret } from "./keys";

export const POST_TYPES = ['Food', 'Lifestyle', 'Tech']
export const cloud_key = {
    cloud_name: cloud_name,
    api_key: cloud_api_key,
    api_secret: cloud_api_secret,
};

export const api_secret = app_api_secret;
export const db_path = app_db_path;