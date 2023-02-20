const pool = require("./db-pool.js");

const TAG = "gods Repository: ";

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

exports.createGod = async (_name, _status, _categoryId, _resume, _src) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "INSERT INTO gods (name, status,category_id,resume, src_img,author_id) VALUES ($1,$2,$3,$4,$5,'2') RETURNING *",
            [_name, _status, _categoryId, _resume, _src]
        );
        return query.rows;
        // Vou tentar esse de cima, caso dê errado uso o de baixo
        //if (query.rows[0]) return query.rows;
        //throw new Error("No rows returned");
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

exports.updateGod = async (_id, _name, _status, _categoryId, _resume, _src) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "UPDATE gods SET name=$2, status=$3,category_id=$4,resume=$5, src_img=$6,author_id ='3',updated_at=now() WHERE id = $1 RETURNING *",
            [_id, _name, _status, _categoryId, _resume, _src]
        );
        return query.rows;
        // Vou tentar esse de cima, caso dê errado uso o de baixo
        //if (query.rows[0]) return query.rows;
        //throw new Error("No rows returned");
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

/*DELETE METHOD QUERY*/

exports.deleteGodById = async (_id) => {
    //Realiza a consulta
    try {
        //hard delete
        const query = await pool.query(
            "DELETE FROM gods WHERE  id=$1 RETURNING *;",
            [_id]
        );
        //soft delete
        /*
        const query = await pool.query(
            "UPDATE gods SET deleted_at=now(),deleted='TRUE' WHERE  id=$1 RETURNING *;",
            [_id]
        );
        */

        if (query.rows[0]) return query.rows;
        throw new Error("No rows returned");
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};