import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { HTTP_RA_EXCEPTION } from '../utls/apiUtils';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    firstLogin: {
        type: Number,
    },
    bio: {
        type: String,
    },
    avatarUri: {
        type: String,
    },
    deviceToken: {
        type: String,
    }
});

UserSchema.statics.authenticate = (username, password, callback) => {
    //TODO:Change this error handling to something with more amounts of sanity. async await;
    User.findOne({ username: username })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {

                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    console.log('Password error');
                    return callback();
                }
            })
        });
};

UserSchema.statics.updateById = (userData, callback) => {
    if (!userData.id) {
        let err = new Error('User id not valid');
        err.status = HTTP_RA_EXCEPTION;
        return callback(err);
    }

    //TODO: remove this from here make change password API method;
    // if (userData.password && userData.password.length <= 0) {
    //     delete userData.password;    
    // }
    User.findOneAndUpdate({ _id: userData.id }, { ...userData }, { new: true, owerWrite: false }, (err, user) => {
        if (err) {
            console.log('error', err);
            return callback(err);
        } else if (!user) {
            var err = new Error('User not found');
            err.status = HTTP_RA_EXCEPTION;
            console.log('brah', err);
            return callback(err);
        }
        console.log('New user', user);
        return callback(null, user);
    });
}

UserSchema.statics.updateUserAvatar = (id, avatarUri, callback) => {
    if (!id || !avatarUri) {
        let error = new Error('Parameter invalid');
        error.status = HTTP_RA_EXCEPTION;
        return callback(error);
    }
    User.findById(id)
        .exec(function (error, user) {
            if (error) {
                return callback(error);
            } else if (!user) {
                let u_error = new Error('User not found');
                u_error.status = HTTP_RA_EXCEPTION;
                return callback(u_error);
            }

            user.avatarUri = avatarUri;
            User.save(function (err, updated) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, updated)
                }
            })
        })
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    console.log('Password hashing');
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        user.firstLogin = 1;
        user.avatarUri = '';
        next();
    })
});

const User = mongoose.model('User', UserSchema);
export default User; 