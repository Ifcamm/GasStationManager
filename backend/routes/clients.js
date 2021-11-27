const express = require("express");
const router = express.Router();

const clientsController = require("../controllers/clients");

router.post("/signup", clientsController.signup);

module.exports = router;
