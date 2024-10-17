var braintree = require("braintree");
const onlineModel = require("../Models/onlineModel");
const dotenv = require("dotenv");
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const braintreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const braintreePayment = async (req, res) => {
  try {
    const { nonce, cart, address,phoneNumber } = req.body;
    let total = 0;
    cart.forEach((i) => {
      total += i.price;
    });

    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          const order = new onlineModel({
            noteBook: cart.map((item) => item._id),
            payment: result,
            address,
            phoneNumber,
            
          });
          await order.save();
          res.json({ ok: true });
        } else {
          console.log(error);
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getonlineOrder = async (req, res) => {
  try {
     const order = await onlineModel.find({})
     .populate("noteBook")
       if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { braintreeToken, braintreePayment,getonlineOrder };
