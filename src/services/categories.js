const categoriesRepository = require("../repositories/categories.js");

const TAG = "categories Service: ";

exports.getAll = async () => {
    try {
        const resp = await categoriesRepository.getAll();
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};

exports.getById = async (id) => {
    try {
        const resp = await categoriesRepository.getById(id);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};

exports.getAllGodsById = async (index) => {
    try {
        const resp = await categoriesRepository.getAllGodsById(index);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};

exports.getGodById = async (godId) => {
    try {
        const resp = await categoriesRepository.getGodById(godId);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};

//----------------------------------------
//Routes related to ADM PERMISSIONS
//----------------------------------------

exports.getTable = async () => {
    try {
        const resp = await categoriesRepository.getTable();
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};

exports.getFromTableById = async (id) => {
    try {
        const resp = await categoriesRepository.getFromTableById(id);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};
