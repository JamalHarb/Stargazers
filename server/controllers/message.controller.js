const Message = require('../models/message.model');

module.exports.createMessage = (request,response) =>{
    const {message, sender_id } = request.body;
    Message.create({message, sender_id})
    .then(message=> {
        console.log(message);
        response.json(message);
    })
    .catch(err=>{
        console.log(err);
        response.status(400).json(err)
    })
}

module.exports.getAllMessages = (request, response) =>{
    Message.find().sort({_id: -1}).populate("sender_id")
    .then(messages=> response.json(messages))
    .catch(err=> response.json(err))
}