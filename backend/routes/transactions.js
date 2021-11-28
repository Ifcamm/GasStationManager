const express = require("express");
const router = express.Router();

const transactionsController = require("../controllers/transactions");

router.get("", transactionsController.getTransactions);
router.post("/transaction", transactionsController.transaction);
router.delete("/:id", transactionsController.deleteTransaction);
router.put("/:id", transactionsController.updateTransaction);

module.exports = router;