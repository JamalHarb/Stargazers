const Event = require('../models/event.model');

module.exports.createEvent = (request, response) => {
    const { name, location, capacity, space, purpose, date, creator_id } = request.body;
    Event.create({
        name,
        location,
        capacity,
        space,
        purpose,
        date,
        creator_id
    })
        .then(event => {
            console.log(event);
            response.json(event);
        })
        .catch(err => {
            console.log(err)
            response.status(400).json({ message: "something went wrong while creating an event", Error: err });
        });
}

module.exports.getAllEvents = (request, response) => {
    Event.find().sort({ date: 1 }).populate('creator_id')
        .then(events => response.json(events))
        .catch(err => response.json(err))
}


module.exports.getTopEvents = (request, response) => {
    // Event.aggregate({$unwind:"$attendees"}, { $group : {_id:'$_id', ct:{$sum:1}}}, { $sort :{ ct: -1}} ).populate("creator_id")
    // Event.aggregate(
    //     [
    //         {
    //             "$lookup": {
    //                 "name": 1,
    //                 "location": 1,
    //                 "capacity": 1,
    //                 "space": 1,
    //                 "purpose": 1,
    //                 "date": 1,
    //                 "creator_id": 1,
    //                 "length": { "$size": "$attendees" }
    //             }
    //         },
    //         { "$sort": { "length": -1 } },
    //         { "$limit": 3 }
    //     ]
    // )
    Event.find().sort({attendees: -1}).limit(3).populate("creator_id")
        .then(events => response.json(events))
        .catch(err => {console.log("error getting top five from ctr"); response.json(err)})
}

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
    Event.find({ creator_id: request.params.userId }).populate("creator_id")
        .then(events => response.json(events))
        .catch(err => response.json(err))
}

module.exports.joinEvent = (request, response) => {
    Event.findOneAndUpdate({ _id: request.params.id }, { $addToSet: { attendees: request.body.userId } }, { new: true, runValidators: true })
        .then(updatedEvent => response.json(updatedEvent))
        .catch(err => response.status(400).json({ message: "something went wrong when joining", error: err }))
}

module.exports.leaveEvent = (request, response) => {
    Event.findOneAndUpdate({ _id: request.params.id }, { $pull: { attendees: request.body.userId } }, { new: true, runValidators: true })
        .then(updatedEvent => response.json(updatedEvent))
        .catch(err => response.status(400).json({ message: "something went wrong when leaving", error: err }))
}