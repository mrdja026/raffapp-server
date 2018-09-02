import cloudinary from 'cloudinary';

export const uploadAsset = (data, type, callback) => {
    cloudinary.v2.uploader.upload(data, function (error, result) {
        if (error) {
            return callback(error);
        } else {
            return callback(null, result);
        }
    });
}
export const generalUpload = (data) => {
    console.log('General uplaod' , data);
    let promise = new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(data, (error, result) => {
            console.log('Whataaaa', error, result);
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
    return promise;
}