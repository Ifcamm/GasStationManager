const express = require("express");
const router = express.Router();

const clientsController = require("../controllers/clients");

router.get("", clientsController.getClients);
router.post("/signup", clientsController.signup);
router.delete("/:id", clientsController.deleteClient);
router.put("/:id", clientsController.updateClient);

module.exports = router;
