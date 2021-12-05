const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const transactionsController = require("../controllers/transactions");

router.get("", usersController.getUsers);

router.post("/signup", usersController.signup);
router.post("/transaction", transactionsController.newTransaction);
router.post("/login", usersController.login);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
