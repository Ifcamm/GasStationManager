const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const usersController = require("../controllers/users");
const transactionsController = require("../controllers/transactions");

router.get("", usersController.getUsers);
router.get("/:id", usersController.getUser);

router.post("/signup", checkAuth, usersController.signup);
router.post("/transaction", checkAuth, transactionsController.newTransaction);
router.post("/login", usersController.login);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
