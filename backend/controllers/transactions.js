const bcrypt = require("bcrypt");
const Transaction = require("../models/transaction");

//metodo para obtener todas las transacciones (GET)

exports.getTransactions = (req, res) => {
	Transaction.find().then((transactionResult) => {
		res.status(200).json(transactionResult);
	});
};

//metodo para crear una nueva transaccion (POST)
exports.newTransaction = (req, res) => {
	const newTransaction = Transaction({
		identification: req.body.identification,
		fueltype: req.body.fueltype,
		paymethod: req.body.paymethod,
		amount: req.body.amount,
		price: req.body.price,
	});

	newTransaction
		.save()
		.then((result) => {
			res.status(201).json({ message: "Transacción registrada" });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};

//metodo para eliminar una transaccion
exports.deleteTransaction = (req, res) => {
	Transaction.deleteOne({ _id: req.params.id }).then((result) => {
		if (result.deletedCount > 0) {
			res.status(200).json({ message: "Transaccion eliminada" });
		} else {
			res.status(200).json({ message: "Transaccion no encontrada" });
		}
		console.log(result);
	});
};

//metodo para modificar una transacciones
exports.updateTransaction = (req, res) => {
	id = req.params.id;
	const transaction = new Transaction({
		_id: id,
		identification: req.body.identification,
		fueltype: req.body.fueltype,
		paymethod: req.body.paymethod,
		amount: req.body.amount,
		price: req.body.price,
	});

	Transaction.updateOne({ _id: id }, transaction).then((result) => {
		console.log(result);
		res.status(200).json({ message: "Actualizacion exitosa" });
	});
};
