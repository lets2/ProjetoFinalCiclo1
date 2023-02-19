const godsRepository = require("../repositories/gods.js");

const TAG = "gods Service: ";

//----------------------------------------
//Routes related to ADM PERMISSIONS
//----------------------------------------

exports.getAll = async () => {
    try {
        const resp = await godsRepository.getAll();
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};

exports.getById = async (id) => {
    try {
        const resp = await godsRepository.getById(id);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};
