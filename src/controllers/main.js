const { json } = require("express");
const mainService = require("../services/main.js");

const TAG = "Main controller: ";

exports.getAll = async (req, res) => {
    //determinar o IP de quem fez a requisição
    console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    console.time("getAll()");

    const response = {
        message: "",
        data: null,
        error: null,
    };
    try {
        const serviceResponse = await mainService.getAll();

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
