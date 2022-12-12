const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OptionSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        trim: true,
        required: 'name is required',
    },
    totalSubmits: {
        type: Schema.Types.Number,
        default: 0
    },
    color: {
        type: Schema.Types.String,
        required:"Color is required"
    },
    pollID: {
        type: Schema.Types.String,
        required: 'poll ID is required'
    },
    userID: {
        type: Schema.Types.String,
        required: 'user ID is required'
    }
},{timestamps: true}) // Row expires after 24h

module.exports = mongoose.model('option', OptionSchema)