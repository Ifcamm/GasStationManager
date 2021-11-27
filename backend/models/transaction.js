const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  identification: { type: Number, required: true },
  fueltype: { type: String, required: true },
  paymethod: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);