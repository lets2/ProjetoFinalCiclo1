const { json } = require("express");
const categoriesService = require("../services/categories.js");

const TAG = "categories controller: ";

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
        const serviceResponse = await categoriesService.getAll();
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
        const serviceResponse = await categoriesService.getById(id);
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

exports.getAllGodsById = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`getAllGodsgods()${milliseconds}`);
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
        const serviceResponse = await categoriesService.getAllGodsById(id);

        response.message = "Success";
        //response.data = serviceResponse.rows;
        response.data = serviceResponse; //this return just one object {name:,url:}

        res.status(200).json(response);
        console.timeEnd(`getAllGodsgods()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd(`getAllGodsgods()${milliseconds}`);
    }
};
/*@author:letonio*/
exports.getGodById = async (req, res) => {
    //
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // creta a new Date instance with current Date
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`getGodById()${milliseconds}`);
    const godId = req.params.godId; //get god Id from url

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await categoriesService.getGodById(godId);

        response.message = "Success";
        //response.data = serviceResponse.rows;
        response.data = serviceResponse; //this return just one object {name:,url:}

        res.status(200).json(response);
        console.timeEnd(`getGodById()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd(`getGodById()${milliseconds}`);
    }
};

//----------------------------------------
//Routes related to ADM PERMISSIONS
//----------------------------------------

exports.getTable = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`getCategoryTable()${milliseconds}`);

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await categoriesService.getTable();
        response.message = "Success";
        response.data = serviceResponse;
        // console.log("CONTROLLER RECEBEU:", response);
        //response.data = serviceResponse.rows;
        res.status(200).json(response);
        console.timeEnd(`getCategoryTable()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd(`getCategoryTable()${milliseconds}`);
    }
};

exports.getFromTableById = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`getFromTableById()${milliseconds}`);
    //precisa tratar algum parâmetro?
    const id = req.params.id; //get index from url
    console.log("OLHA O ID QUE CHEGOU NO CONTROLER:", id);
    console.log("---------------------------------");
    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await categoriesService.getFromTableById(id);
        console.log("Olha o que vem:", serviceResponse);
        response.message = "Success";
        //response.data = serviceResponse.rows;
        response.data = serviceResponse; //this return just one object {name:,url:}

        res.status(200).json(response);
        console.timeEnd(`getFromTableById()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd(`getFromTableById()${milliseconds}`);
    }
};
//precisei do path aqui:
const path = require("path");

/*POST/CREATE METHOD*/
exports.createCategory = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`createCategory()${milliseconds}`);

    // TTRY TO GET PARAMETERS FROM REQ.BODY E VERIFY IF ARE OKAY
    /////////const { name, src, hexColor } = req.body;

    ///-----------------------------------------------------------
    ///TENTANDO IMPLEMENTAR ADICAO DE ARQUIVO CATEGORIAS!
    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

    const filename = req.file.filename;
    //const mimetype = req.file.mimetype;
    //const extension = path.extname(req.file.originalname);
    // const nameWithExtension = filename + extension;

    const name = req.body.name;
    const hexColor = req.body.hexColor;
    //const src = nameWithExtension;
    const src = filename; //Não precisa de extensão, é so o codigo mesmo!

    //const fileName = nameWithExtension;

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ///TENTANDO IMPLEMENTAR ADICAO DE ARQUIVO CATEGORIAS!

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!name || !src || !hexColor) {
        console.log(TAG, "NAME,SRC or HEXCOLOR is UNDEFINED/NULL");
        response.message = "Request need to have {name,src,hexColor})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`createCategory()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (name === "" || src === "" || hexColor === "") {
        console.log(TAG, "NAME,SRC or HEXCOLOR is EMPTY");
        response.message = "These fields cannot be empty: name,src,hexColor})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are EMPTY";

        res.status(400).json(response);
        console.timeEnd(`createCategory()${milliseconds}`);
        return;
    }

    if (IsNotString(name) || IsNotString(src) || IsNotString(hexColor)) {
        console.log(TAG, "NAME,SRC or HEXCOLOR is not STRING");
        response.message =
            "These fields should be STRING TYPE:name,src,hexColor)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not STRING";

        res.status(400).json(response);
        console.timeEnd(`createCategory()${milliseconds}`);
        return;
    }
    //Field "name" is not in a valid format. Example of valid data: "#a00f9b"
    if (colorIsNotHex(hexColor)) {
        console.log(TAG, "HEXCOLOR is not a VALID FORMAT");
        response.message =
            "hexColor need to be #[0-9A-Fa-f]{6} format, ex: #0abf59";
        response.data = null;
        response.error =
            "[400] Bad request! hexColor is not a hexadecimal string";

        res.status(400).json(response);
        console.timeEnd(`createCategory()${milliseconds}`);
        return;
    }

    try {
        // Call Service method
        const serviceResponse = await categoriesService.createCategory(
            name,
            src,
            hexColor
        );

        // Retornar com sucesso
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`createCategory()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`createCategory()${milliseconds}`);
    }
};
/*PUT/UPDATE METHOD*/
exports.updateCategory = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`updateCategory()${milliseconds}`);

    const id = req.params.id; //get index from url
    // TTRY TO GET PARAMETERS FROM REQ.BODY E VERIFY IF ARE OKAY
    const { name, src, hexColor } = req.body;

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!id || !name || !src || !hexColor) {
        console.log(TAG, "ID,NAME,SRC or HEXCOLOR is UNDEFINED/NULL");
        response.message = "Request need to have {id,name,src,hexColor})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`updateCategory()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (id === "" || name === "" || src === "" || hexColor === "") {
        console.log(TAG, "ID, NAME,SRC or HEXCOLOR is EMPTY");
        response.message =
            "These fields cannot be empty: id,name,src,hexColor})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are EMPTY";

        res.status(400).json(response);
        console.timeEnd(`updateCategory()${milliseconds}`);
        return;
    }

    if (
        IsNotString(id) ||
        IsNotString(name) ||
        IsNotString(src) ||
        IsNotString(hexColor)
    ) {
        console.log(TAG, "ID,NAME,SRC or HEXCOLOR is not STRING");
        response.message =
            "These fields should be STRING TYPE:id,name,src,hexColor)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not STRING";

        res.status(400).json(response);
        console.timeEnd(`updateCategory()${milliseconds}`);
        return;
    }
    //Field "name" is not in a valid format. Example of valid data: "#a00f9b"
    if (colorIsNotHex(hexColor)) {
        console.log(TAG, "HEXCOLOR is not a VALID FORMAT");
        response.message =
            "hexColor need to be #[0-9A-Fa-f]{6} format, ex: #0abf59";
        response.data = null;
        response.error =
            "[400] Bad request! hexColor is not a hexadecimal string";

        res.status(400).json(response);
        console.timeEnd(`updateCategory()${milliseconds}`);
        return;
    }

    try {
        // Call Service method
        const serviceResponse = await categoriesService.updateCategory(
            id,
            name,
            src,
            hexColor
        );

        // Retornar com sucesso
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`updateCategory()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`updateCategory()${milliseconds}`);
    }
};

/*DELETE CATEGORY BY ID*/

exports.deleteCategoryById = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`deleteCategoryById()${milliseconds}`);
    //precisa tratar algum parâmetro?
    const id = req.params.id; //get index from url

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await categoriesService.deleteCategoryById(id);
        console.log("Olha o que vem:", serviceResponse);
        response.message = "Success";
        //response.data = serviceResponse.rows;
        response.data = serviceResponse; //this return just one object {name:,url:}

        res.status(200).json(response);
        console.timeEnd(`deleteCategoryById()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd(`deleteCategoryById()${milliseconds}`);
    }
};

/*check if is not valid HEXADECIMAL STRING*/
function colorIsNotHex(_hexColorString) {
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/; //valid ex:#a0090f

    if (hexColorRegex.test(_hexColorString)) {
        return false;
    } else {
        return true;
    }
}

/*check if is not string type*/
function IsNotString(_data) {
    if (typeof _data !== "string") {
        return true;
    }
    return false;
}
