const { verifySignUp, validate, checkToken } = require("../middleware");
const controller = require("../controllers/auth.controller");
const {
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
  app.post(
    "/auth/postSignUp",
    [
      verifySignUp.checkDuplicateEmail,
    ],
    validate([
      body('name').not().isEmpty().withMessage('Please enter the Name.'),
      body('email').not().isEmpty().isEmail().withMessage('Please enter the valid Email Address.'),
      body('password').not().isEmpty().isLength({
        min: 5
      }).withMessage('Password must be at least 5 character long'),
    ]),

    controller.signup
  )
  app.post(
    "/auth/postSignIn",
    validate([
      body('email').not().isEmpty().isEmail().withMessage('Please enter the valid Email Address.'),
      body('password').not().isEmpty().withMessage('Please enter the password.'),
    ]),
    controller.signin
  ) 

  app.get(
    "/auth/postTokenRefresh",
    checkToken,
    controller.refreshToken
  )

}