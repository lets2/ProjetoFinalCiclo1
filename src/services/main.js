const mainRepository = require("../repositories/main.js");

const TAG = "Main Service: ";

exports.getAll = async () => {
    try {
        const resp = await mainRepository.getAll();
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};
