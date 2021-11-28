const Client = require("../models/client");

//metodo para obtener clientes (GET)
exports.getClients = (req, res) => {
  Client.find().then((clientResult) => {
    res.status(200).json(clientResult);
  })
};

//metodo para crear nuevo cliente
exports.signup = (req, res) => {
  const newClient = new Client({
    username: req.body.username,
    email: req.body.email,
    identification: req.body.identification,
    plate: req.body.plate,
  });
  
      newClient
        .save()
        .then((result) => {
          res.status(201).json({ message: "Cliente creado" });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
};

//metodo para eliminar un cliente (DELETE)

exports.deleteClient = (req, res) => {
  Client.deleteOne({ _id: req.params.id }).then((result) => {
    if(result.deletedCount>0){
      res.status(200).json({message: 'Cliente Eliminado'});
    } else {
      res.status(200).json({message: 'Cliente no encontrado'});
    }
    console.log(result);
  });
};

//metodo para actualizar un cliente (PUT)

exports.updateClient = (req, res) => {
  const id = req.params.id;
  const client = new Client({
    _id: id,
    username: req.body.username,
    email: req.body.email,
    identification: req.body.identification,
    plate: req.body.plate,
  });

  Client.updateOne({_id : id}, client).then((result) => {
    console.log(result);
    res.status(200).json({message: 'Actualizacion exitosa'});
  });
};
