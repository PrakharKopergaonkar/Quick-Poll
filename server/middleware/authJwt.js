const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    // Remove Bearer from string

    token = token.slice(7);
    jwt.verify(token, process.env.PROJECT_NAME, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: "Invalid Token..."
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
}
