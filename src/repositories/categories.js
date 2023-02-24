const pool = require("./db-pool.js");

const TAG = "categories Repository: ";

exports.getAll = async () => {
    //Perform the query
    try {
        const query = await pool.query(
            "SELECT id,name,src_img as src FROM categories ORDER BY id;"
        );
        //If query  sucessfully , it has at least 1 row
        if (query.rows[0]) return query.rows;

        throw new Error("No rows returned");
        //
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

exports.getById = async (id) => {
    //Perform the query
    try {
        const query = await pool.query(
            "SELECT id,name,src_img as src, hex_color FROM categories WHERE id=$1;",
            [id]
        );

        if (query.rows[0]) return query.rows;

        throw new Error("No rows returned");
        //
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

exports.getAllGodsById = async (id) => {
    //Perform the query
    try {
        const query = await pool.query(
            "SELECT gods.id, gods.name, gods.status, gods.resume, gods.category_id, categories.name AS name_category, gods.src_img FROM gods JOIN categories ON categories.id = gods.category_id WHERE gods.category_id = $1 ORDER BY gods.category_id;",
            [id]
        );
        if (query.rows[0]) return query.rows;

        throw new Error("No rows returned");
        //
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

exports.getGodById = async (godId) => {
    try {
        const query = await pool.query(
            "SELECT gods.id, gods.name, gods.status, gods.resume, gods.category_id, categories.name AS name_category, gods.src_img FROM gods JOIN categories ON categories.id = gods.category_id WHERE gods.id = $1;",
            [godId]
        );

        if (query.rows[0]) return query.rows;

        throw new Error("No rows returned");
        //
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

//----------------------------------------
//Routes related to ADM PERMISSIONS
//----------------------------------------

exports.getTable = async () => {
    //Perform the query
    try {
        const query = await pool.query(
            "SELECT id,name,src_img as src, hex_color FROM categories ORDER BY id;"
        );

        if (query.rows[0]) return query.rows;

        throw new Error("No rows returned");
        //
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

exports.getFromTableById = async (id) => {
    //Realiza a consulta
    try {
        const query = await pool.query(
            "SELECT id,name,src_img as src, hex_color FROM categories WHERE id=$1;",
            [id]
        );

        if (query.rows[0]) return query.rows;

        throw new Error("No rows returned");
        //
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

exports.createCategory = async (_name, _src, _hexColor) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "INSERT INTO categories (name, src_img,hex_color,author_id) VALUES ($1,$2,$3,'6') RETURNING *",
            [_name, _src, _hexColor]
        );
        //return query.rows;
        // Vou tentar esse de cima, caso dê errado uso o de baixo
        if (query.rows[0]) return query.rows;

        throw new Error("No rows returned");
        //
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

exports.updateCategory = async (_id, _name, _src, _hexColor) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "UPDATE categories set name=$2, src_img=COALESCE ($3, src_img),hex_color=$4,author_id='6',updated_at=now() WHERE id=$1 RETURNING *",
            [_id, _name, _src, _hexColor]
        );
        //return query.rows;
        if (query.rows[0]) return query.rows;

        throw new Error("No rows returned");
        //
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

exports.deleteCategoryById = async (_id) => {
    //Realiza a consulta
    try {
        //hard delete
        const query = await pool.query(
            "DELETE FROM categories WHERE  id=$1 RETURNING *;",
            [_id]
        );
        //soft delete
        /*
        const query = await pool.query(
            "UPDATE categories SET deleted_at=now(),deleted='TRUE' WHERE  id=$1 RETURNING *;",
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
