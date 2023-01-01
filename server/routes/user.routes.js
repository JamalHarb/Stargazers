const User = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt');

module.exports = app => {
    app.post('/api/register', User.register);
    app.post('/api/login', User.login);
    app.get('/api/users/logged', authenticate, User.getLoggedUser);
    app.get('/api/users/logout', User.logout);
}