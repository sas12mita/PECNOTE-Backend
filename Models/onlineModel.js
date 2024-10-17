const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    noteBook: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NoteBook",
      },
    ],
    payment: {},
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
  
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const onlineModel = mongoose.model("Order", orderSchema);

module.exports = onlineModel;
