const express=require('express');
const Router=express.Router();
const {home,register,login,getUser,user_auth}=require("../Controller/usercontroller");
const {admin_auth,postNotes,getNotes}=require("../Controller/admincontroller")
const {requireSignin, isAdmin}=require("../middleware/authenticate");
Router.route("/").get(home);
Router.route("/register").post(register);
Router.route("/getUser").get(getUser);

Router.route("/login").post(login);
Router.route("/softcopy").post(postNotes);
Router.route("/softcopy").get(getNotes);

Router.route("/user_auth").get(requireSignin,user_auth)
Router.route("/admin_auth").get(requireSignin,isAdmin,admin_auth)


module.exports = Router;