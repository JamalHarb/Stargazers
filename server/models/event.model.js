const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({

    name: { type: String,
        required: [true, "name is required"],
    minlength:[5, "event's name must be at least 5 characters"],
   

},
    

     location: { type: String,
        required: [true, "name is required"],
    
    

},

capacity: { type: Number,
    required: [true, "capacity is required"],


},

space: { type: String,
    required: [true, "astronomy phenomenon name is required"],
    minlength:[5, "phenomenon name must be at least 5 characters"],



},


purpose: { type: String,
    



},

user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},

attendees: [ {
    type: mongoose.Schema.Types.ObjectId,
     ref : 'User'} ]


  
}, { timestamps: true });
module.exports.Event = mongoose.model('Event', EventSchema);