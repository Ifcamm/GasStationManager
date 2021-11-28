const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  identification: { type: Number, required: true, unique: true },
  plate: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Client", clientSchema);