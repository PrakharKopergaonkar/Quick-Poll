const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PollSchema = new mongoose.Schema({
    title: {
        type: Schema.Types.String,
        trim: true,
        required: 'title is required',
    },
    userID: {
        type: Schema.Types.String,
        required: 'User ID is required'
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: true
    }
    
},{timestamps: true}) // Row expires after 24h

module.exports = mongoose.model('poll', PollSchema)