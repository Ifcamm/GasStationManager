const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const clientSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  identification: { type: Number, required: true, unique: true },
  plate: { type: String, required: true, unique: true },  
  password: { type: String, required: true },
});

clientSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Client", clientSchema);