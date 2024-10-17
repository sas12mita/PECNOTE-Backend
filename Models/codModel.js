const mongoose = require("mongoose");

const CODSchema = new mongoose.Schema(
  {
    noteBook: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NoteBook",
      },
    ],
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CODModel = mongoose.model("COD", CODSchema);

module.exports = CODModel;
