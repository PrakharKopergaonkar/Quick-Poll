const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        trim: true,
        required: 'name is required',
    },
    email: {
        type: Schema.Types.String,
        trim: true,
        required: 'email is required',
    },
    password: {
        type: Schema.Types.String,
        trim: true,
        required: 'password is required',
    },
    
},{timestamps: true}) 

module.exports = mongoose.model('user', UserSchema)