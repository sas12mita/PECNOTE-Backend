const CODModel = require("../Models/codModel");
const UserModel = require("../Models/userModel");

const createOrder = async (req, res) => {
    try {
        const {cart, address, phoneNumber } = req.body;
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
        });

        // Save order to database
        const order = new CODModel({
            noteBook: cart.map((item) => item._id),
            address,
            phoneNumber,
            totalAmount: total, // Include total amount in the order
        });

        await order.save();
        res.json({ status: true });
    } catch (error) {
        console.log(error); // Log the error for debugging purposes
        res.status(500).json({ error: "Internal server error" });
    }
};

const getcodOrder = async (req, res) => {
  try {
     const order = await CODModel.find({})
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

module.exports = {
  createOrder,
  getcodOrder
};
