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
            console.log("DEU FALSE, SENHA/USER ERRADO!", dbPasswordHash);
            response.message = "Forbidden";
            response.error = "[403] Acesso negado";
            res.status(403).json(response); //forbidden
            console.timeEnd(`login()${milliseconds}`);

            return;
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

/*POST METHOD TO ADD NEW USER*/

exports.registerNewAdm = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // create a new instance Date current
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`registerNewAdm()${milliseconds}`);

    //Aqui troquei name por username, depois tem que padronizar
    const username = req.body.username; //
    //const plainTextPassword = req.body.plainTextPassword;
    const plainTextPassword = req.body.password;
    const email = req.body.email;

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!username || !plainTextPassword || !email) {
        //
        console.log(TAG, "NAME,EMAIL or PASSWORD is UNDEFINED/NULL");
        response.message = "Request need to have {name,email,password})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`registerNewAdm()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (username === "" || plainTextPassword === "" || email === "") {
        //
        console.log(TAG, "NAME,EMAIL or PASSWORD is EMPTY");
        response.message =
            "These fields cannot be empty: name,email,password})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are EMPTY";

        res.status(400).json(response);
        console.timeEnd(`registerNewAdm()${milliseconds}`);
        return;
    }

    if (
        IsNotString(username) ||
        IsNotString(email) ||
        IsNotString(plainTextPassword)
    ) {
        //
        console.log(TAG, "USERNAME or PASSWORD is not STRING");
        response.message =
            "These fields should be STRING TYPE:username, password)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not STRING";

        res.status(400).json(response);
        console.timeEnd(`registerNewAdm()${milliseconds}`);
        return;
    }

    try {
        //
        //ZONA DE CRIACAO DO HASH
        ////  const dbPasswordHash = serviceResponse[0].password;
        const dbPasswordHash = await bcrypt.hash(plainTextPassword, 10);
        // Call Service method
        const serviceResponse = await usersService.registerNewAdm(
            username,
            dbPasswordHash,
            email
        );

        // Retornar com sucesso
        response.message = "Success";
        response.data = serviceResponse;

        res.status(200).json(response);
        console.timeEnd(`registerNewAdm()${milliseconds}`);
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`registerNewAdm()${milliseconds}`);
    }
};

//PUT METHOD - CHANGE PASWORD

/*POST METHOD TO ADD NEW USER*/

exports.changePassword = async (req, res) => {
    //determinar o IP de quem fez a requisição
    //console.log(TAG, "getAll() from" + req.connection.remoteAddress);
    const now = new Date(); // create a new instance Date current
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0"); //
    console.time(`changePassword()${milliseconds}`);

    //Aqui troquei name por username, depois tem que padronizar
    const username = req.body.username; //

    const oldTextPassword = req.body.oldPassword;
    const newTextPassword = req.body.newPassword;

    //Standardizing the response that the frontend will receive.
    const response = {
        message: "",
        data: null,
        error: null,
    };

    if (!username || !oldTextPassword || !newTextPassword) {
        //
        console.log(
            TAG,
            "USERNAME,OLDPASSWORD OR NEW PASSWORD is UNDEFINED/NULL"
        );
        response.message =
            "Request need to have {username,oldPassword,newPassword})";
        response.data = null;
        response.error = "[400] Bad request! Some fields are UNDEFINED/NULL";

        res.status(400).json(response);
        console.timeEnd(`changePassword()${milliseconds}`);
        return; //If dont use return, the function  will continue
    }

    if (username === "" || oldTextPassword === "" || newTextPassword === "") {
        //
        console.log(TAG, "USERNAME,OLDPASSWORD OR NEW PASSWORD is EMPTY");
        response.message =
            "These fields cannot be empty: username,oldPassword,newPassword)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are EMPTY";

        res.status(400).json(response);
        console.timeEnd(`changePassword()${milliseconds}`);
        return;
    }

    if (
        IsNotString(username) ||
        IsNotString(oldTextPassword) ||
        IsNotString(newTextPassword)
    ) {
        //
        console.log(TAG, "USERNAME,OLDPASSWORD OR NEW PASSWORD is not STRING");
        response.message =
            "These fields should be STRING TYPE:username,oldPassword,newPassword)";
        response.data = null;
        response.error = "[400] Bad request! Some fields are not STRING";

        res.status(400).json(response);
        console.timeEnd(`changePassword()${milliseconds}`);
        return;
    }

    try {
        //

        // Call Service method
        const serviceResponse = await usersService.getHashPassword(username);
        //
        console.log("OLHA O SERVICE RESPONSE1:", serviceResponse);
        //Salva o hash da senha antiga
        const oldDbPasswordHash = serviceResponse[0].password;
        //compara se a senha passada gera o mesmo rash do banco de dados
        const result = await bcrypt.compare(oldTextPassword, oldDbPasswordHash); //boolean

        if (result) {
            //trocar senha pela nova senha:
            //ZONA DE CRIACAO DO HASH NOVO!!
            const newDbPasswordHash = await bcrypt.hash(newTextPassword, 10);
            const serviceResponseChangePassword =
                await usersService.saveNewHashPassword(
                    username,
                    newDbPasswordHash
                );
            // Retornar com sucesso
            console.log(
                "TENTOU POR NOVA SENHA LHA RETORNO:",
                serviceResponseChangePassword
            );
            response.message = "Success";
            response.data = serviceResponseChangePassword;

            res.status(200).json(response);
            console.timeEnd(`changePassword()${milliseconds}`);
        } else {
            console.log("DEU FALSE, SENHA/USER ERRADO!", oldDbPasswordHash);
            response.message = "Forbidden";
            response.error = "[400] Bad Request! Senha antiga não confere";
            res.status(400).json(response); //errou senha antiga
            console.timeEnd(`changePassword()${milliseconds}`);

            return;
        }
    } catch (error) {
        console.log(TAG, error);

        response.message = "Erro interno do Servidor";
        response.data = null;
        response.error = "Erro interno do Servidor";

        res.status(500).json(response);
        console.timeEnd(`registerNewAdm()${milliseconds}`);
    }
};

/*check if is not string type*/
function IsNotString(_data) {
    if (typeof _data !== "string") {
        return true;
    }
    return false;
}
