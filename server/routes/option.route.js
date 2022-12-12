
const { checkToken, validate } = require("../middleware");
const controller = require("../controllers/option.controller");
const {
    validationResult,
    body,
    param
} = require('express-validator');


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.put(
        "/option/updateOption/:pollID/:optionID",
        checkToken,
        validate([
            param('pollID').not().isEmpty().withMessage("Please enter poll ID"),
            param("optionID").not().isEmpty().withMessage("Please enter option ID"),
            body("polls").not().isArray({ min: 2 }).withMessage("Please enter atleast 2 options")
        ]),
        controller.updateOption
    )

    app.delete(
        "/option/deleteOption/:pollID/:optionID",
        checkToken,
        validate([
            param('pollID').not().isEmpty().withMessage("Please enter poll ID"),
            param("optionID").not().isEmpty().withMessage("Please enter option ID"),
        ]),
        controller.deleteOption
    )

}