const EventController = require('../controllers/event.controller');
module.exports = function(app){
   
    app.post('/api/events', EventController.createEvent);
    app.get('/api/events', EventController.getAllEvents);
    app.get('/api/events/:id', EventController.getEvent);
    app.put('/api/events/:id', EventController.updateEvent);
    app.delete('/api/events/:id', EventController.deleteEvent);

    app.get('/api/events/user/:userId', EventController.getAllEventsCreatedbyUser);






}
