const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [6, 'Password should be more than 6 characters']
    }
});

userSchema.pre('save', function (next) {
    console.log(this);
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });

});

userSchema.static('findByUsername', function (username) {
    return this.findOne({ username });
});

userSchema.method('validatePassword', function (password) {
   return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;