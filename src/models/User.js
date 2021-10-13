const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required!'],
        validate: [/^[a-zA-Z0-9]+$/, 'Username should have english letters and digits'],
        unique: true,
        minlength: [5, 'Username should be at least 5 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        validate: [/^[a-zA-Z0-9]+$/, 'Password should have english letters and digits'],
        minlength: [8, 'Password should be at least 8 characters']
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

// userSchema.virtuals('repeatPassword')
//     .set(function(v){
//         if(v=== this.password){
            
//         }
//     })

const User = mongoose.model('User', userSchema);

module.exports = User;