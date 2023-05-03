const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const chats = new Schema({
    message: {
        type: String,
        required: true
    },
    is_bot_message: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true}
);

// chats.plugin(AutoIncrement, {inc_field: 'seq'});
const Chat = mongoose.model('Chat', chats);
module.exports = Chat;
