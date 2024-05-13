const userModel = require("../Models/userModel");
const softCopyModel = require("../Models/softcopyModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const home = async (req, res) => {
  try {
    res
      .status(200)
      .send("I m from home");
  } catch (e) {
    console.log(e);
  }
}

const register = async (req, res) => {
  try {

    const { fullName, email, phoneNumber, password } = req.body;
    const userExist = await userModel.findOne({ email })
    if (userExist) {
      return res.json("exist");
    }
    const userCreated = await userModel.create({ fullName, email, phoneNumber, password });
    console.log(req.body)
    console.log(userCreated);

    res.status(201).json({
      status: true,
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });

    ////const token= await userCreated.generateToken(),
    // const userId= await userCreated._id.toString(),
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Inter server error" });
  }
}
const login = async (req, res) => {
  
  try {
    const { email, password } = req.body
    const userExist = await userModel.findOne({ email });    
    if (!userExist) {
      res.json("notexist");

    }
    else{
    const role=userExist.role;
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (isPasswordValid && role===0) {
      res.status(200).json({
        status: "userexist",
        message: " User Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      })
     
      //const user = await userModel.findById(req.user._id);
    
    }
    else if(isPasswordValid && role===1)
    {  
      res.status(200).json({
        status: "adminexist",
        message: " Admin Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      })
    }
    else if(!isPasswordValid)
    {
      res.json({
        status:"pw_wrong",
      })
    }
    else {
      res.json({ status: false });
    }
  }
  } catch (e) {
    console.log(e);
  }
}

const user_auth = async (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {

  }
}




module.exports = { home, register, login,  user_auth};