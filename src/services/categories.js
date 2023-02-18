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

exports.getByIndex = async (id) => {
    try {
        const resp = await categoriesRepository.getByIndex(id);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};

exports.getAllGodsByIndex = async (index) => {
    try {
        const resp = await categoriesRepository.getAllGodsByIndex(index);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};
