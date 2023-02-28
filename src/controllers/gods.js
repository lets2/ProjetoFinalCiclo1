const { json } = require("express");
const godsService = require("../services/gods.js");
const path = require("path");
const TAG = "god controller: ";
const fs = require("fs"); //vou usar para deletar imagem

//----------------------------------------
//Routes related to ADM PERMISSIONS
//----------------------------------------

exports.getAll = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`getAll()${milliseconds}`);

    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await godsService.getAll();
        response.message = "Success";
        response.data = serviceResponse;
        //response.data = serviceResponse.rows;
        res.status(200).json(response);
        console.timeEnd(`getAll()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd(`getAll()${milliseconds}`);
    }
};

exports.getById = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`getgods()${milliseconds}`);
    //precisa tratar algum parâmetro?
    const id = req.params.id; //get index from url

    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await godsService.getById(id);
        console.log("Olha o que vem:", serviceResponse);
        response.message = "Success";
        //response.data = serviceResponse.rows;
        response.data = serviceResponse; //this return just one object {name:,url:}

        res.status(200).json(response);
        console.timeEnd(`getgods()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);
        if (error.message === "No rows returned") {
            console.log("[404] NOT FOUND");
            response.message = "Nenhum deus corresponde ao ID informado";
            response.data = null;
            response.error = "[404] Not Found!";

            res.status(404).json(response);
            console.timeEnd(`getgods()${milliseconds}`);
            return;
        }
        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd(`getgods()${milliseconds}`);
    }
};

/*GET METHOD - FILTER BY KEY WORDS*/
exports.getGodsByKeywords = async (req, res) => {
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`getGodsByKeywords()${milliseconds}`);

    //const arrayKeywords = req.body.arrayKeywords;
    const arrayKeywords = req.query.strings.split(",");
    console.log("VERIFICANDO SE MEU ARRAY EH UM ARRAY:", arrayKeywords);
    console.log("E A DECISAO EH:", Array.isArray(arrayKeywords));

    const response = {
        message: "",
        data: null,
        error: null,
    };
    //
    if (!arrayKeywords) {
        console.log(TAG, "ARRAYKEYWORDS is UNDEFINED/NULL");

        response.message = "Request need to have {arrayKeywords})";
        response.data = null;
        response.error = "[400] Bad request! arrayKeywords is UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`getGodsByKeywords()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }
    if (IsNotArray(arrayKeywords)) {
        console.log(TAG, "ARRAYKEYWORDS is NOT ARRAY");

        response.message =
            "Request need to have a JSON {'arrayKeywords':['string1','string2',...]})";
        response.data = null;
        response.error =
            "[400] Bad request! body need to have: {'arrayKeywords':['string1','string2',...]}";

        res.status(400).json(response);
        console.timeEnd(`getGodsByKeywords()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    try {
        // Call Service method
        const serviceResponse = await godsService.getGodsByKeywords(
            arrayKeywords
        );

        // Retornar com sucesso
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`getGodsByKeywords()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);
        if (error.message === "No rows returned") {
            console.log("[404] NOT FOUND");
            response.message = "Nenhum deus corresponde à pesquisa";
            response.data = null;
            response.error = "[404] Not Found!";

            res.status(404).json(response);
            console.timeEnd(`getGodsByKeywords()${milliseconds}`);
            return;
        }
        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`getGodsByKeywords()${milliseconds}`);
    }
};

/*POST/CREATE METHOD*/
exports.createGod = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`createGod()${milliseconds}`);

    // TTRY TO GET PARAMETERS FROM REQ.BODY E VERIFY IF ARE OKAY

    let filename; //declarei como variavel por conta do if else
    //Teste de fazer EDICAO DE CATEGORIA
    if (!req.file) {
        filename = null;
    } else {
        filename = req.file.filename;
    }

    console.log("OLHA O FILENAMEVAZIO!!!!!!!!!!!1:", filename);
    const { name, status, categoryId, resume } = req.body;

    ///  const filename = req.file.filename;

    //// const name = req.body.name;
    ///  const status = req.body.status;
    //////  const resume = req.body.resume;
    ////// const categoryId = req.body.categoryId;

    const src = filename; //Não precisa de extensão, é so o codigo mesmo!

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!name || !status || !categoryId || !resume || !src) {
        console.log(
            TAG,
            "NAME, STATUS, CATEGORYID, RESUME or SRC is UNDEFINED/NULL"
        );
        response.message =
            "Request need to have {name, status, caregoryId, resume, src})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`createGod()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (
        name === "" ||
        status === "" ||
        categoryId === "" ||
        resume === "" ||
        src === ""
    ) {
        console.log(TAG, "NAME, STATUS, CATEGORYID, RESUME or SRC is EMPTY");
        response.message =
            "These fields cannot be empty: name, status, caregoryId, resume, src)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are EMPTY";

        res.status(400).json(response);
        console.timeEnd(`createGod()${milliseconds}`);
        return;
    }

    if (
        IsNotString(name) ||
        IsNotString(status) ||
        IsNotString(categoryId) ||
        IsNotString(resume) ||
        IsNotString(src)
    ) {
        console.log(TAG, "NAME, STATUS, CATEGORYID, RESUME or SRC is not STRING");
        response.message =
            "These fields should be STRING TYPE:name, status, categoryId, resume, src)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not STRING";

        res.status(400).json(response);
        console.timeEnd(`createGod()${milliseconds}`);
        return;
    }

    try {
        // Call Service method
        const serviceResponse = await godsService.createGod(
            name,
            status,
            categoryId,
            resume,
            src
        );

        // Retornar com sucesso
        response.message = "Deus criado com sucesso!";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`createGod()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`createGod()${milliseconds}`);
    }
};

/*PUT/UPDATE METHOD*/
exports.updateGod = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`updateGod()${milliseconds}`);

    // god Id is into url
    const id = req.params.id;

    let filename; //declarei como variavel por conta do if else
    //Teste de fazer EDICAO DE CATEGORIA
    if (!req.file) {
        filename = null;
    } else {
        filename = req.file.filename;
    }

    console.log("OLHA O FILENAMEVAZIO!!!!!!!!!!!1:", filename);
    const { name, status, categoryId, resume } = req.body;

    //
    const src = filename; //Não precisa de extensão, é so o codigo mesmo!

    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!name || !status || !categoryId || !resume) {
        console.log(
            TAG,
            "NAME, STATUS, CATEGORYID, RESUME or SRC is UNDEFINED/NULL"
        );
        response.message =
            "Request need to have {name, status, categoryId, resume, src})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`updateGod()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (name === "" || status === "" || categoryId === "" || resume === "") {
        console.log(TAG, "NAME, STATUS, CATEGORYID, RESUME or SRC is EMPTY");
        response.message =
            "These fields cannot be empty: name, status, categoryId, resume, src)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are EMPTY";

        res.status(400).json(response);
        console.timeEnd(`updateGod()${milliseconds}`);
        return;
    }

    if (
        IsNotString(name) ||
        IsNotString(status) ||
        IsNotString(categoryId) ||
        IsNotString(resume)
    ) {
        console.log(TAG, "NAME, STATUS, CATEGORYID, RESUME or SRC is not STRING");
        response.message =
            "These fields should be STRING TYPE:name, status, categoryId, resume, src)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not STRING";

        res.status(400).json(response);
        console.timeEnd(`updateGod()${milliseconds}`);
        return;
    }

    try {
        // Call Service method
        const serviceResponse = await godsService.updateGod(
            id,
            name,
            status,
            categoryId,
            resume,
            src
        );

        // Retornar com sucesso
        response.message = "Deus atualizado com sucesso!";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`updateGod()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);
        if (error.message === "No rows returned") {
            console.log("[404] NOT FOUND");
            response.message = "Nenhum deus corresponde ao ID informado";
            response.data = null;
            response.error = "[404] Not Found!";

            res.status(404).json(response);
            console.timeEnd(`updateGod()${milliseconds}`);
            return;
        }
        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`updateGod()${milliseconds}`);
    }
};

/* DELETE METHOD*/
exports.deleteGodById = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`deleteGodById()${milliseconds}`);
    //precisa tratar algum parâmetro?
    const id = req.params.id; //get index from url

    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await godsService.deleteGodById(id);
        console.log("Olha o que vem:", serviceResponse);
        response.message = "Deus excluído com sucesso!";
        //response.data = serviceResponse.rows;
        response.data = serviceResponse; //this return just one object {name:,url:}

        // teoricamente, se deu certo, response.data possui um array
        //com o elemento que foi deletado, vou add uma função de deletar o arquivo
        //da umagem
        // console.log("ESSE EH O serviceResponse:", serviceResponse);
        if (serviceResponse) {
            excluiArquivoDaImagemDeCategoria(serviceResponse);
        }

        res.status(200).json(response);
        console.timeEnd(`deleteGodById()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);
        if (error.message === "No rows returned") {
            console.log("[404] NOT FOUND");
            response.message = "Nenhum deus corresponde ao ID informado";
            response.data = null;
            response.error = "[404] Not Found!";

            res.status(404).json(response);
            console.timeEnd(`deleteGodById()${milliseconds}`);
            return;
        }
        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd(`deleteGodById()${milliseconds}`);
    }
};

/*check if is not string type*/
function IsNotString(_data) {
    if (typeof _data !== "string") {
        return true;
    }
    return false;
}

/*check if is not array type*/
function IsNotArray(_data) {
    if (Array.isArray(_data)) {
        return false;
    }
    return true;
}

//colocando aqui função de apagar arquivo:
function excluiArquivoDaImagemDeCategoria(serviceResponse) {
    console.log("Apagarei esse arquivo aqui:", serviceResponse[0].src_img);
    const uploadDir = path.join(__dirname, "../../public", "assets", "uploads");
    const filePath = path.join(uploadDir, serviceResponse[0].src_img);
    console.log("OLHA O PATH:", filePath);
    fs.unlink(filePath, (error) => {
        if (error && error.code !== "ENOENT") {
            // Se houver um erro que não seja o arquivo não encontrado, retorna um erro interno do servidor
            throw "ERRO AO TENTAR DELETAR, ARQUIVO NAO ENCONTRADO";
        }
    });
}
