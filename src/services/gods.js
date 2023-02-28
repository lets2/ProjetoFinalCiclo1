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
        throw error;
    }
};

exports.getById = async (id) => {
    try {
        const resp = await godsRepository.getById(id);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
        throw error;
    }
};

/*GET METHOD - FILTER BY KEYWORDS*/

exports.getGodsByKeywords = async (_arrayKeywords) => {
    // Need to calculate something with the inputs?     No
    // Don't need to do anything

    // Do you need to ask the Database for something?   Yes
    try {
        // Need to filter/organize?               Yes
        const resp = await godsRepository.getGodsByKeywords(_arrayKeywords);
        // Need to do something internally with this data?     No
        //Don't need to do anything, just return the information
        return resp;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

/*POST/CREATE METHOD*/

exports.createGod = async (_name, _status, _categoryId, _resume, _src) => {
    // Need to calculate something with the inputs?     No
    // Don't need to do anything

    // Do you need to ask the Database for something?   Yes
    try {
        // Need to filter/organize?               Yes
        const resp = await godsRepository.createGod(
            _name,
            _status,
            _categoryId,
            _resume,
            _src
        );
        // Need to do something internally with this data?     No
        //Don't need to do anything, just return the information
        return resp;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

/*PUT/UPDATE METHOD*/

exports.updateGod = async (_id, _name, _status, _categoryId, _resume, _src) => {
    // Need to calculate something with the inputs?     No
    // Don't need to do anything

    // Do you need to ask the Database for something?   Yes
    try {
        // Need to filter/organize?               Yes
        const resp = await godsRepository.updateGod(
            _id,
            _name,
            _status,
            _categoryId,
            _resume,
            _src
        );
        // Need to do something internally with this data?     No
        //Don't need to do anything, just return the information
        return resp;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

/* DELETE METHOD */

exports.deleteGodById = async (id) => {
    try {
        const resp = await godsRepository.deleteGodById(id);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
        throw error;
    }
};
