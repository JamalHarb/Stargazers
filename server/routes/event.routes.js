const EventController = require('../controllers/event.controller');
module.exports = function(app){
   
    app.post('/api/events', EventController.createEvent);
    app.get('/api/events', EventController.getAllEvents);
    app.get('/api/events/top/three', EventController.getTopEvents);
    app.get('/api/events/:id', EventController.getEvent);
    app.put('/api/events/:id', EventController.updateEvent);
    app.delete('/api/events/:id', EventController.deleteEvent);
    app.get('/api/events/user/:userId', EventController.getAllEventsCreatedbyUser);
    app.put('/api/events/join/:id', EventController.joinEvent);
    app.put('/api/events/leave/:id', EventController.leaveEvent);
}
