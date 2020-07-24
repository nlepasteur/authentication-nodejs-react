const jwt = require("jsonwebtoken");

module.exports = function checkTokenSetUser(req, res, next) {
  const authHeader = req.get("authorization");
  console.log("enter");

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          next();
        }
        req.user = user;
        next();
      });
    }
  } else {
    next();
  }
};
