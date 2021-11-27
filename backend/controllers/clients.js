const bcrypt = require("bcrypt");
const Client = require("../models/client");

//metodo para crear nuevo cliente
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const newClient = new Client({
        username: req.body.username,
        email: req.body.email,
        identification: req.body.identification,
        plate: req.body.plate,
        password: hash,
      });
  
      newClient
        .save()
        .then((result) => {
          res.status(201).json({ message: "Cliente creado" });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });
  };
