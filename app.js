const express = require('express');
const bodyParser = require ("body-parser")
const app = express();
const Books = require("./models/Books");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/user");


mongoose.connect('mongodb+srv://jeremiebrandely:f553dcb7a94@cluster0.47llfxb.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

app.use(bodyParser.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;