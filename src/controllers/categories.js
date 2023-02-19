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
    //padronizando o formato da resposta
    //fica mais fácil para o front-end
    //saber o que esperar
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
