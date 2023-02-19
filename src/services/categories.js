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

/*POST/CREATE METHOD*/

exports.createCategory = async (_name, _src, _hexColor) => {
    // Need to calculate something with the inputs?     No
    // Don't need to do anything

    // Do you need to ask the Database for something?   Yes
    try {
        // Need to filter/organize?               Yes
        const resp = await categoriesRepository.createCategory(
            _name,
            _src,
            _hexColor
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

exports.updateCategory = async (_id, _name, _src, _hexColor) => {
    // Need to calculate something with the inputs?     No
    // Don't need to do anything

    // Do you need to ask the Database for something?   Yes
    try {
        // Need to filter/organize?               Yes
        const resp = await categoriesRepository.updateCategory(
            _id,
            _name,
            _src,
            _hexColor
        );
        // Need to do something internally with this data?     No
        //Don't need to do anything, just return the information
        return resp;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

/*DELETE METHOD*/

exports.deleteCategoryById = async (_id) => {
    try {
        const resp = await categoriesRepository.deleteCategoryById(_id);
        return resp;
    } catch (error) {
        console.log(TAG, "ERROR caught");
    }
};
