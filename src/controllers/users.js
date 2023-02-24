const { json } = require("express");
const usersService = require("../services/users.js");

const TAG = "users controller: ";

const bcrypt = require("bcrypt");
const jwtLib = require("jsonwebtoken");

/*POST TO LOGIN*/
exports.login = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // create a new instance Date current
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`login()${milliseconds}`);

    const name = req.body.name;
    //const plainTextPassword = req.body.plainTextPassword;
    const plainTextPassword = req.body.password;

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!name || !plainTextPassword) {
        //
        console.log(TAG, "NAME or PASSWORD is UNDEFINED/NULL");
        response.message = "Request need to have {name and passeword})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`login()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (name === "" || plainTextPassword === "") {
        //
        console.log(TAG, "NAME or PASSWORD is EMPTY");
        response.message = "These fields cannot be empty: name,password})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are EMPTY";

        res.status(400).json(response);
        console.timeEnd(`login()${milliseconds}`);
        return;
    }

    if (IsNotString(name) || IsNotString(plainTextPassword)) {
        //
        console.log(TAG, "NAME or PASSWORD is not STRING");
        response.message = "These fields should be STRING TYPE:name, password)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not STRING";

        res.status(400).json(response);
        console.timeEnd(`login()${milliseconds}`);
        return;
    }

    try {
        // Call Service method
        const serviceResponse = await usersService.login(
            name,
            plainTextPassword
        );
        //
        //ZONA DE VERIFICACAO SE ESTA OKAY E RETORNA O COOKIE
        const dbPasswordHash = serviceResponse[0].password;

        const result = await bcrypt.compare(plainTextPassword, dbPasswordHash); //boolean

        if (result) {
            //
            const jwt = jwtLib.sign({ name }, process.env.JWT_SECRET);
            res.cookie("session", jwt);
            // res.status(200).json({ controller: "GEROU cookie" });
        } else {
            console.log("DEU FALSE, ALGO DE ERRADO!", dbPasswordHash);
            // res.status(403).json({});//forbidden
        }

        // Retornar com sucesso
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`login()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`login()${milliseconds}`);
    }
};

//Use delete to logout (to delete cookie)
exports.logout = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // cria uma nova instância de Date com a data atual
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`logout()${milliseconds}`);

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    try {
        // Call Service method
        ////const serviceResponse = await usersService.login(.. );
        const serviceResponse = [{ cookieStatus: "liberado" }];
        //
        res.clearCookie("session");

        // Retornar com sucesso
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`logout(s)${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`login()${milliseconds}`);
    }
};

/*check if is not string type*/
function IsNotString(_data) {
    if (typeof _data !== "string") {
        return true;
    }
    return false;
}
