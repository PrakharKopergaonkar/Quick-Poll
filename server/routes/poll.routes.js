const { checkToken, validate } = require("../middleware");
const controller = require("../controllers/poll.controller");
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

    app.get(
        "/poll/getPollDetails/:id",
        validate([
            param("id").not().isEmpty().withMessage("Please enter poll ID")
        ]),
        controller.getPollDetails
    )

    app.get(
        "/poll/getAllUserPolls/:id",
        checkToken,
        validate([
            param("id").not().isEmpty().withMessage("Please enter User ID")
        ]),
        controller.getAllUserPolls
    )

    app.post(
        "/poll/postSubmitPoll",
        checkToken,
        validate([
            body('name').not().isEmpty().withMessage("Please enter poll name"),
            body("userID").not().isEmpty().withMessage("Please enter User ID"),
            body("polls").not().isArray({ min: 2 }).withMessage("Please enter atleast 2 options")
        ]),
        controller.submitPoll
    )

    app.post(
        "/poll/postDeactivatePoll/:id",
        checkToken,
        validate([
            body("userID").not().isEmpty().withMessage("Please enter User ID"),
            param("id").not().isEmpty().withMessage("Please enter poll ID")
        ]),
        controller.deactivatePoll
    )

    app.post(
        "/poll/postReactivatePoll/:id",
        checkToken,
        validate([
            body("userID").not().isEmpty().withMessage("Please enter User ID"),
            param("id").not().isEmpty().withMessage("Please enter poll ID")
        ]),
        controller.reactivatePoll
    )

    app.put(
        "/poll/updatePoll/:id",
        checkToken,
        validate([
            param("id").not().isEmpty().withMessage("Please enter poll ID"),
            body("userID").not().isEmpty().withMessage("Please enter User ID"),
        ]),
        controller.updatePoll
    )

    app.delete(
        "/poll/deletePoll/:id",
        // checkToken,
        validate([
            body("userID").not().isEmpty().withMessage("Please enter User ID"),
            param("id").not().isEmpty().withMessage("Please enter poll ID")
        ]),
        controller.deletePoll
    )


}