import { CLOUDINARY_INFO, SOME_API_SECRET } from "./secrets";

export const POST_TYPES = ['Food', 'Lifestyle', 'Tech']
export const cloud_key = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
};

export const api_secret = process.env.API_SECRET;