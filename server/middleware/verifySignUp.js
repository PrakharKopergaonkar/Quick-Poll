const db = require("../models");
const user = db.user;
checkDuplicateEmail = (req, res, next) => {
  user.findOne(
    {
      email: req.body.email
    }
  ).then(user => {
    
    if (user) {
      return res.status(400).json({
        status: false,
        message:"Invalid Email !"
      })
    }
    next();
  });
};


const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
};
  
  module.exports = verifySignUp;