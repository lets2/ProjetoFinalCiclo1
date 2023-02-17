const { json } = require("express");
const categoriesService = require("../services/categories.js");

const TAG = "categories controller: ";

exports.getAll = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    console.time("getAll()");

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
        response.data = serviceResponse.rows;

        res.status(200).json(response);
        console.timeEnd("getAll()");
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd("getAll()");
    }
};

exports.getByIndex = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    console.time("getByIndex()");
    const index = req.params.index; //get index from url
    //padronizando o formato da resposta
    //fica mais fácil para o front-end
    //saber o que esperar
    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await categoriesService.getByIndex(index);

        response.message = "Success";
        //response.data = serviceResponse.rows;
        response.data = serviceResponse; //this return just one object {name:,url:}

        res.status(200).json(response);
        console.timeEnd("getByIndex()");
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd("getByIndex()");
    }
};

//router.get("/categories/:index/all",categoriesController.getAllGodsByIndex);

exports.getAllGodsByIndex = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    console.time("getAllGodsByIndex()");
    const index = req.params.index; //get index from url
    //padronizando o formato da resposta
    //fica mais fácil para o front-end
    //saber o que esperar
    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await categoriesService.getAllGodsByIndex(
            index
        );

        response.message = "Success";
        //response.data = serviceResponse.rows;
        response.data = serviceResponse; //this return just one object {name:,url:}

        res.status(200).json(response);
        console.timeEnd("getAllGodsByIndex()");
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do servidor";
        response.data = null;
        response.error = "Erro interno do servidor";

        res.status(500).json(response);
        console.timeEnd("getAllGodsByIndex()");
    }
};
