const jwt = require("jsonwebtoken");

module.exports = function createTokenSendResponse(user, res, next) {
  delete user.password;
  jwt.sign(
    user,
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" },
    (err, token) => {
      res.json({ user, token });
    }
  );
};
