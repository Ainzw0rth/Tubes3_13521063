const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const knowledges = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Knowledge = mongoose.model('Knowledge', knowledges);
module.exports = Knowledge;
