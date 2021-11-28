const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("", usersController.getUsers);
router.post("/signup", usersController.signup);
router.delete("/:id", usersController.deleteUser);

module.exports = router;