const pool = require("./db-pool.js");

const TAG = "categories Repository: ";

//----------------------------------------
//Routes related to ADM PERMISSIONS
//----------------------------------------

exports.getAll = async () => {
    //VOU TENTAR USAR O CONNECT
    //Realiza a consulta
    try {
        const query = await pool.query(
            "SELECT gods.id, gods.name, gods.status, gods.resume, gods.category_id, categories.name AS name_category, gods.src_img FROM gods JOIN categories ON categories.id = gods.category_id;"
        );
        //Se a requisição deu certo existe pelo menos um row
        if (query.rows[0]) return query.rows;
        throw new Error("No rows returned");
        //se a condição anterior for falsa, implica que
        //nenhuma coluna foi retornada, sendo que
        //o front end esta esperado uma resposta com rows
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

exports.getById = async (id) => {
    //Realiza a consulta
    try {
        const query = await pool.query(
            "SELECT gods.id, gods.name, gods.status, gods.resume, gods.category_id, categories.name AS name_category, gods.src_img FROM gods JOIN categories ON categories.id = gods.category_id WHERE gods.id=$1;",
            [id]
        );
        if (query.rows[0]) return query.rows;
        throw new Error("No rows returned");
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};
