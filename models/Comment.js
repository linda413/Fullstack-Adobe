const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required:true
    },
    text :{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
