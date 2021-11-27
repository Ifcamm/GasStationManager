const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const clientRoutes = require("./routes/clients");
const userRoutes = require("./routes/users");

// Import de las routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Configuracion de la conexion a la bd
mongoose
  .connect(
    "mongodb+srv://dbUser:blogify123@cluster0.3p7cj.mongodb.net/dbUser?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Estamos conectados a nuestra BD");
  })
  .catch(() => {
    console.log("Houston tenemos un problema");
  });

app.use("/api/clients", clientRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
