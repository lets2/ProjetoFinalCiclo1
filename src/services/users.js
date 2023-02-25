const usersRepository = require("../repositories/users.js");

const TAG = "users Service: ";

/*POST/CREATE METHOD*/

exports.login = async (_name, _plainTextPassword) => {
    // Need to calculate something with the inputs?     No
    // Don't need to do anything

    // Do you need to ask the Database for something?   Yes
    try {
        // Need to filter/organize?               Yes
        const resp = await usersRepository.login(_name, _plainTextPassword);
        // Need to do something internally with this data?     No
        //Don't need to do anything, just return the information
        return resp;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

/*POST METHOD - REGISTER NEW USER*/

exports.registerNewAdm = async (_username, _dbPasswordHash, _email) => {
    try {
        const resp = await usersRepository.registerNewAdm(
            _username,
            _dbPasswordHash,
            _email
        );
        return resp;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

//não usei put ainda nem delete!!

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

/*DELETE METHOD - nao tenho deletar usuario porenquanto*/

exports.deleteCategoryById = async (_id) => {
    try {
        const resp = await categoriesRepository.deleteCategoryById(_id);
        return resp;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

/*GET METHOD - GET OLD HASH PASSWORD*/

exports.getHashPassword = async (_username) => {
    try {
        const resp = await usersRepository.getHashPassword(_username);
        return resp;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

/*GET METHOD - GET OLD HASH PASSWORD*/

exports.saveNewHashPassword = async (_username, _newDbPasswordHash) => {
    try {
        const resp = await usersRepository.saveNewHashPassword(
            _username,
            _newDbPasswordHash
        );
        return resp;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};
