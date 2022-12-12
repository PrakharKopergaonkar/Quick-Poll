const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config()


// declare a new express app
const app = express()
app.use(bodyParser.json())

//cors
app.use(cors());

//mongodb configuration
mongoose.Promise = global.Promise
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@quickpoll.ka5e3j3.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log(`Connected to Mongodb`)
    })
    .catch((error) => {
        console.log(error)
    })

//routes
app.get('/', (req, res) => res.send("API Running") )
require('./routes/auth.routes')(app);
require("./routes/poll.routes")(app);

const PORT = process.env.PORT || 7000
app.listen(PORT, function () {
    console.log(`App started on port ${PORT}`)
});

module.exports = app
