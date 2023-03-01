const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const cookieParser = require("cookie-parser");

//Import router file/module from backend
const router = require("./src/router.js");

const PORT = process.env.PORT || 80;
const HOSTNAME = process.env.HOST;

const app = express();

//
app.use(cookieParser(process.env.JWT_SECRET));
//
app.use(cors());

app.use(bodyParser.json());
app.use(express.static("./public"));

//Use router.js like a "middleware"
app.use(router);

//firefox have some security problems warning,
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data:;"
    );
    next();
});

//houve as requisições na porta definida
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
