const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const checkAuth = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) return res.status(401).json({ message: "Unathorized access" });

  try {
    const decoded = jwt.verify(token, "sumit1021");
    console.log(decoded);

    //fetch full user form DB
    const user = await UserModel.findById(decoded.ID);
    if (!user) return res.status(401).json({ message: "user not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = checkAuth;
