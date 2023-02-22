const { json } = require("express");
const godsService = require("../services/gods.js");

const TAG = "god controller: ";

//----------------------------------------
//Routes related to ADM PERMISSIONS
//----------------------------------------

exports.getAll = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`getAll()${milliseconds}`);

    //padronizando o formato da resposta
    //fica mais fácil para o front-end
    //saber o que esperar
    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await godsService.getAll();
        response.message = "Success";
        response.data = serviceResponse;
        // console.log("CONTROLLER RECEBEU:", response);
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
    //padronizando o formato da resposta
    //fica mais fácil para o front-end
    //saber o que esperar
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

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd(`getgods()${milliseconds}`);
    }
};

//precisei do path aqui:
const path = require("path");

/*POST/CREATE METHOD*/
exports.createGod = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`createGod()${milliseconds}`);

    // TTRY TO GET PARAMETERS FROM REQ.BODY E VERIFY IF ARE OKAY
    ////////const { name, status, categoryId, resume, src } = req.body;

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //FAZENDO O MULTER pegando os dados;

    const filename = req.file.filename;
    // const mimetype = req.file.mimetype;
    // const extension = path.extname(req.file.originalname);
    // const nameWithExtension = filename + extension;

    const name = req.body.name;
    const status = req.body.status;
    const resume = req.body.resume;
    const categoryId = req.body.categoryId;

    //const src = nameWithExtension;
    const src = filename; //Não precisa de extensão, é so o codigo mesmo!
    // const fileName = nameWithExtension;
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!name || !status || !categoryId || !resume || !src) {
        console.log(
            TAG,
            "NAME,STATUS,CATEGORYID,RESUME or SRC is UNDEFINED/NULL"
        );
        response.message =
            "Request need to have {name,status,caregoryId,resume,src})";
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
        console.log(TAG, "NAME,STATUS,CATEGORYID,RESUME or SRC is EMPTY");
        response.message =
            "These fields cannot be empty: name,status,caregoryId,resume,src)";
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
        console.log(TAG, "NAME,STATUS,CATEGORYID,RESUME or SRC is not STRING");
        response.message =
            "These fields should be STRING TYPE:name,status,categoryId,resume,src)";
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
        response.message = "Success";
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
    // TTRY TO GET PARAMETERS FROM REQ.BODY E VERIFY IF ARE OKAY
    const { name, status, categoryId, resume, src } = req.body;

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!name || !status || !categoryId || !resume || !src) {
        console.log(
            TAG,
            "NAME,STATUS,CATEGORYID,RESUME or SRC is UNDEFINED/NULL"
        );
        response.message =
            "Request need to have {name,status,categoryId,resume,src})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`updateGod()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (
        name === "" ||
        status === "" ||
        categoryId === "" ||
        resume === "" ||
        src === ""
    ) {
        console.log(TAG, "NAME,STATUS,CATEGORYID,RESUME or SRC is EMPTY");
        response.message =
            "These fields cannot be empty: name,status,categoryId,resume,src)";
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
        IsNotString(resume) ||
        IsNotString(src)
    ) {
        console.log(TAG, "NAME,STATUS,CATEGORYID,RESUME or SRC is not STRING");
        response.message =
            "These fields should be STRING TYPE:name,status,caregoryId,resume,src)";
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
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`updateGod()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

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
    //padronizando o formato da resposta
    //fica mais fácil para o front-end
    //saber o que esperar
    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await godsService.deleteGodById(id);
        console.log("Olha o que vem:", serviceResponse);
        response.message = "Success";
        //response.data = serviceResponse.rows;
        response.data = serviceResponse; //this return just one object {name:,url:}

        res.status(200).json(response);
        console.timeEnd(`deleteGodById()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

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
