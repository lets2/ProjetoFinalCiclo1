const pool = require("./db-pool.js");

const TAG = "gods Repository: ";

//----------------------------------------
//Routes related to ADM PERMISSIONS
//----------------------------------------

exports.getAll = async () => {
    //Perform the query
    try {
        const query = await pool.query(
            "SELECT gods.id, gods.name, gods.status, gods.resume, gods.category_id, categories.name AS name_category, gods.src_img FROM gods JOIN categories ON categories.id = gods.category_id ORDER BY gods.id;"
        );
        //If query successfully, it have at least 1 row
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
            "SELECT gods.id, gods.name, gods.status, gods.resume, gods.category_id, categories.name AS name_category, gods.src_img FROM gods JOIN categories ON categories.id = gods.category_id WHERE gods.id=$1;",
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

/*GET GODS DATABASE BASED IN KEYWORDS*/
exports.getGodsByKeywords = async (_arrayKeywords) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "SELECT gods.id, gods.name, gods.status, gods.resume, gods.category_id, categories.name AS name_category, gods.src_img FROM gods JOIN categories ON categories.id = gods.category_id WHERE LOWER(gods.name || ' ' || categories.name || ' ' || gods.resume) LIKE ANY (array(SELECT '%' || LOWER(x) || '%' FROM unnest($1::text[]) AS x)) ORDER BY gods.id;",
            [_arrayKeywords]
        );
        console.log("_KEYWORDS:", _arrayKeywords);
        //return query.rows;
        if (query.rows[0]) return query.rows;
        console.log("ROWS", query);
        //throw new Error("No rows returned");
        //nessa funcao de pesquisa, decidi colocar que caso
        //não tenha conteudo relaxionado com a pesquisa
        //retorne um array vazio:
        return [];
        //
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
};

exports.createGod = async (_name, _status, _categoryId, _resume, _src) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "INSERT INTO gods (name, status,category_id,resume, src_img,author_id) VALUES ($1,$2,$3,$4,$5,'6') RETURNING *",
            [_name, _status, _categoryId, _resume, _src]
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

exports.updateGod = async (_id, _name, _status, _categoryId, _resume, _src) => {
    // Performs the query with filtering/sorting
    try {
        const query = await pool.query(
            "UPDATE gods SET name=$2, status=$3,category_id=$4,resume=$5, src_img=COALESCE ($6, src_img),author_id ='6',updated_at=now() WHERE id = $1 RETURNING *",
            [_id, _name, _status, _categoryId, _resume, _src]
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
        //
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};
