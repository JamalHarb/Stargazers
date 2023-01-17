const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Event name is required"],
        minlength: [5, "Event's name must be at least 5 characters"],
    },

    location: {
        type: String,
        required: [true, "Location is required"],
    },

    capacity: {
        type: Number,
        required: [true, "Capacity is required"],
        min: [1, "Capacity should be greater than zero"]
    },

    space: {
        type: String,
        required: [true, "Astronomy phenomenon name is required"],
        minlength: [5, "Astronomy phenomenon name must be at least 5 characters"],
    },

    date: {
        type: Date,
        required: [true, "Date is required"],
        min: [new Date() - 86400000, "Date must be in the future"]
    },

    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;