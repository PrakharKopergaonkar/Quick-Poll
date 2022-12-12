const verifySignUp = require("./verifySignUp")
const checkToken = require("./authJwt");
const validate = require("./validate");

module.exports = {
    verifySignUp,
    checkToken,
    validate
}