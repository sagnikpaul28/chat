const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = {
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
};

const Users = mongoose.model('users', userSchema);
module.exports = Users;
