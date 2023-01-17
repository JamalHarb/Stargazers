const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be at least 2 characters."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be at least 2 characters."]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    createdEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]

    // joinedEvents: [ {
    //     type: mongoose.Schema.Types.ObjectId,
    //      ref : 'Event'} ]
}, { timestamps: true });

UserSchema.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.User.countDocuments({ email: value });
    return !emailCount;
}, 'Email already exists');

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;