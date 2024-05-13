const jwt = require("jsonwebtoken");
const userModel=require("../Models/userModel")
const requireSignin = async(req,res,next)=>
{
    try {
      const token=req.header("Authorization");
        const decode = jwt.verify(
          req.headers.authorization,
          process.env.JWT_SECRET_KEY
        );
        const userData= await userModel.findOne({email:decode.email}).select({
          password:0,
          tokens:0,
        });
        req.user=userData;
        req.token=token;
        next();
      } catch (error) {
        console.log(error);
      }
     
}
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
    