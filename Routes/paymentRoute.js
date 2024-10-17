const express = require('express');
const PaymentRoute = express.Router();
const { braintreePayment, braintreeToken,getonlineOrder} = require("../Controller/PaymentController");
const {createOrder,getcodOrder} =require("../Controller/CODcontroller")
//const { requireSignin } = require("../middleware/authenticate");

PaymentRoute.route("/braintreeToken").get(braintreeToken);
PaymentRoute.route("/payment").post(braintreePayment); 
PaymentRoute.route("/getonlineOrder").get(getonlineOrder); 
PaymentRoute.route("/codpayment").post(createOrder); 
PaymentRoute.route("/getcodOrder").get(getcodOrder); 



module.exports = PaymentRoute;
