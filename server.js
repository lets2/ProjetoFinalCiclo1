const https = require("https");
const fs = require("fs");

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

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data:;"
    );
    next();
});

//add key/openssl
const options = {
    key: fs.readFileSync("ssl/chave-privada.pem"),
    cert: fs.readFileSync("ssl/certificado.pem"),
};

https.createServer(options, app).listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on https://${HOSTNAME}:${PORT}`);
});
