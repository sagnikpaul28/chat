const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = {
    message: {
        type: String,
        required: true,
    },
    sentBy: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
};

const chatDetailsSchema = {
    people: {
        type: [String],
        required: true
    },
    chats: {
        type: [chatSchema],
        required: true
    }
};

const Chats = mongoose.model('chats', chatSchema);
const ChatDetails = mongoose.model('chatDetails', chatDetailsSchema);


module.exports = {
    Chats: Chats,
    ChatDetails: ChatDetails
};
