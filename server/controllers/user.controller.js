const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

class UserController{
    register(req, res){
        const user = new User(req.body);
        user.save()
            .then(() => {
                res.cookie('usertoken', jwt.sign({_id: user._id}, SECRET_KEY), {httpOnly: true})
                .json({message: "successfully created a user", user: user})
            })
            .catch(err => res.status(400).json(err));
    }

    login(req, res){
        User.findOne({email: req.body.email})
            .then(user => {
                if(user === null){
                    res.status(400).json({message: "Invalid credentials!"});
                }
                else{
                    bcrypt.compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if(passwordIsValid){
                                res.cookie('usertoken', jwt.sign({_id: user._id}, SECRET_KEY), {httpOnly: true})
                                .json({message: "success"});
                            }
                            else{
                                res.status(400).json({message: "Invalid credentials!"});
                            }
                        })
                        .catch(err => res.status(400).json({message: "Invalid login attempt!", err}));
                }
            })
            .catch(err => res.status(400).json(err));
    }

    getLoggedUser(req, res){
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});
        User.findById(decodedJWT.payload._id)
            .then(user => res.json({user}))
            .catch(err => res.json(err));
    }

    logout(req, res){
        res.cookie("usertoken", jwt.sign({_id: ""}, SECRET_KEY), {
            httpOnly: true,
            maxAge: 0
        })
        .json({message: "successfully logged out"})
    }
}

module.exports = new UserController();