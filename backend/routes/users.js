const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.post("/transaction", usersController.transaction);
router.post("/signup", usersController.signup);

module.exports = router;