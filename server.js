const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//tentando colocar um module de parser-cookie
const cookieParser = require("cookie-parser");

//IMporta o arquivo/modulo de rotas do backend
const router = require("./src/router.js");

const PORT = process.env.PG_PORT | 8080;
const HOSTNAME = process.env.PG_HOST;

const app = express();

//
app.use(cookieParser("minha chave secreta"));
//

app.use(cors());
//app.use(cors({ origin: "http://localhost/" }));

app.use(bodyParser.json());
app.use(express.static("./public"));

//Utiliza o "router.js como middleware"
app.use(router);

//houve as requisições na porta definida
/*
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
*/
///////////////
//FAZENDO IMPLEMENTAÇÃO DO MULTER
////////////

const multer = require("multer");
const path = require("path");

const port = process.env.PG_PORT | 8080;

// Configura o Multer para salvar arquivos no diretório 'uploads'
//eu nem tinha um diretorio upload,ele foi la e criou

const upload = multer({
    dest: "./assets/uploads/",
});

//Meu Firefox apareceu uns problema de segurança, mandei o erro
//no chat gpt e ele sugeriu botar esse negócio aí
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data:;"
    );
    next();
});
/*
// Define a rota para lidar com o upload de arquivos
app.post("/uploadCategory", upload.single("file"), (req, res) => {
    // Obtém o nome do arquivo e exibe na página
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const extension = path.extname(req.file.originalname);
    const nameWithExtension = filename + extension;

    const name = req.body.name;
    const hexColor = req.body.hexColor;
    const src = nameWithExtension;
    const fileName = nameWithExtension;

    const objRes = {
        message: "Success",
        data: [
            {
                id: "12",
                name: name,
                fileName: fileName,
                src: src,
                hexColor: hexColor,
            },
        ],
        error: null,
    };
    res.status(200); //okay
    res.json(objRes);
});
*/
// Inicia o servidor - LISTEN DA PAGINA SIMPLES Q FIZ Q TEM MULTER
/*app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
*/

//houve as requisições na porta definida
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
