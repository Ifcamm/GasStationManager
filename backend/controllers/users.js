const bcrypt = require("bcrypt");
const Transaction = require("../models/transaction");
const User = require("../models/user");

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,        
        email: req.body.email,
        identification: req.body.identification,
        phoneNumber: req.body.phoneNumber,
        password: hash,
      });
  
      newUser
        .save()
        .then((result) => {
          res.status(201).json({ message: "Usuario creado" });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });
  };

exports.transaction = (req, res) => {
    const newTransaction = Transaction({
        identification: req.body.identification,
        fueltype: req.body.plate,
        paymethod: req.body.paymethod,
        amount: req.body.amount,
    });

    newTransaction.save().then((result) => {
        res.status(201).json({ message: "Transacción registrada" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      })
}
