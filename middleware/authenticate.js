const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const requireSignin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userData = await userModel.findOne({ email: decoded.email }).select({
      password: 0,
      tokens: 0,
    });

    if (!userData) {
      return res.status(401).send("Invalid token.");
    }

    req.user = userData;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const isAdmin=async(req,res,next)=>
{
    try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
}
module.exports={requireSignin,isAdmin}
    