const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = function(req, res, next) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("token ")) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  const token = req.headers.authorization.split("token ")[1];

  try {
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
