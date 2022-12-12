let db = {};

//configure your models here
db.user = require("./user.model");
db.poll = require("./poll.model");
db.option = require("./option.model");

module.exports = db;