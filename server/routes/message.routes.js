const MessageController = require('../controllers/message.controller');

module.exports = function(app){
    app.post('/api/message', MessageController.createMessage);
    app.get('/api/messages', MessageController.getAllMessages);
}