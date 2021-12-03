const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
	identification: { type: String, required: true },
	fueltype: { type: String, required: true },
	paymethod: { type: String, required: true },
	amount: { type: String, required: true },
	price: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
