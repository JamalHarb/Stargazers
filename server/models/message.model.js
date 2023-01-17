const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required:[true, "Message is required"],
        minlength: [1, "Message must be at least 1 Character"],
    },

    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},{ timestamps : true } );

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;