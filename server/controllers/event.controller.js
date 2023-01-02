const Event = require('../models/event.model');

module.exports.createEvent = (request, response) => {
    const { name, location, capacity, space, purpose, creator_id } = request.body;
    Event.create({
        name,
        location,
        capacity,
        space,
        purpose,
        creator_id
    })
        .then(event => {
            console.log(event);
            response.json(event);
        })
        .catch(err => {
            console.log(err)
            response.status(400).json({message: "something went wrong while creating an event", Error: err});
        });
}

module.exports.getAllEvents = (request, response) => {
    Event.find().sort({_id:-1}).populate("user_id")
        .then(events => response.json(events))
        .catch(err => response.json(err))
}


// module.exports.getTopEvents = (request, response) => {
//     Event.find().sort({"at":-1}).limit(3).populate("user_id")
//         .then(events => response.json(events))
//         .catch(err => response.json(err))
// }

module.exports.getEvent = (request, response) => {
    Event.findOne({ _id: request.params.id })
        .then(event => response.json(event))
        .catch(err => response.json(err))
}

module.exports.updateEvent = (request, response) => {
    Event.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true, runValidators: true })
        .then(updatedEvent => response.json(updatedEvent))
        .catch(err => response.status(400).json(err))
}


module.exports.deleteEvent = (request, response) => {
    Event.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.getAllEventsCreatedbyUser = (request, response) => {
    Event.find({ user_id: request.params.userId }).populate("user_id")
        .then(events => response.json(events))
        .catch(err => response.json(err))
}









