const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//IMporta o arquivo/modulo de rotas do backend
const router = require("./src/router.js");

const PORT = process.env.PG_PORT | 8080;
const HOSTNAME = process.env.PG_HOST;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./public"));

//Utiliza o "router.js como middleware"
app.use(router);

//houve as requisições na porta definida
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
