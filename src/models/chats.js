const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const chats = new Schema({
    quest: {
        type: String,
        required: true
    },
    respond: {
        type: String,
        required: true
    }
},
    { timestamps: true}
);

// chats.plugin(AutoIncrement, {inc_field: 'seq'});
const Chat = mongoose.model('Chat', chats);
module.exports = Chat;
