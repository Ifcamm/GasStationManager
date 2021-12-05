const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//metodo para obtener todos los usuarios (GET)

exports.getUsers = (req, res) => {
	User.find().then((userResult) => {
		res.status(200).json(userResult);
	});
};

//metodo para crear un nuevo usuario (POST)
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

//metodo para eliminar un usuarios (DELETE)

exports.deleteUser = (req, res) => {
	User.deleteOne({ _id: req.params.id }).then((result) => {
		if (result.deletedCount > 0) {
			res.status(200).json({ message: "Usuario eliminado" });
		} else {
			res.status(200).json({ message: "Usuario no encontrado" });
		}
	});
};

exports.login = (req, res) => {
	let userGet;
	User.findOne({ identification: req.body.identification })
		.then((user) => {
			if (!user) {
				return;
			}
			userGet = user;
			return bcrypt.compare(req.body.password, user.password);
		})
		.then((result) => {
			if (!result) {
				return res.status(401).json({ message: "Failed authentication" });
			}
			const token = jwt.sign(
				{
					identification: userGet.identification,
					userId: userGet._id,
				},
				"MisionTIC2021_Secret_Token_GSM",
				{ expiresIn: "1h" }
			);

			res.status(200).json({ token: token, expiresIn: 3600 });

			// res.status(200).json({ message: "Successful authentication" });
		})
		.catch((err) => {
			return res.status(401).json({ message: "Failed authentication" });
		});
};

//metodo para actualizar un usuario (PUT) - NO INCLUYE CAMBIO DE PASSWORD
