const pool = require("./db-pool.js");

const TAG = "categories Repository: ";

exports.getAll = async () => {
    //VOU TENTAR USAR O CONNECT
    //Realiza a consulta
    try {
        const query = await pool.query(
            "SELECT id,name,src_img as src FROM categories ORDER BY id;"
        );
        //Se a consulta deu certo existe pelo menos um row
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
            "SELECT id,name,src_img as src, hex_color FROM categories WHERE id=$1;",
            [id]
        );
        if (query.rows[0]) return query.rows;
        throw new Error("No rows returned");
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

exports.getAllGodsById = async (id) => {
    //Realiza a consulta
    try {
        const query = await pool.query(
            "SELECT gods.id, gods.name, gods.status, gods.resume, gods.category_id, categories.name AS name_category, gods.src_img FROM gods JOIN categories ON categories.id = gods.category_id WHERE gods.category_id = $1 ORDER BY gods.category_id;",
            [id]
        );
        if (query.rows[0]) return query.rows;
        throw new Error("No rows returned");
        //Se a consulta deu certo existe pelo menos um row

        //o front end esta esperado uma resposta com rows
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
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

//----------------------------------------
//Routes related to ADM PERMISSIONS
//----------------------------------------

exports.getTable = async () => {
    //VOU TENTAR USAR O CONNECT
    //Realiza a requisição
    try {
        const query = await pool.query(
            "SELECT id,name,src_img as src, hex_color FROM categories ORDER BY id;"
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

exports.getFromTableById = async (id) => {
    //Realiza a consulta
    try {
        const query = await pool.query(
            "SELECT id,name,src_img as src, hex_color FROM categories WHERE id=$1;",
            [id]
        );
        if (query.rows[0]) return query.rows;
        throw new Error("No rows returned");
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
        return query.rows;
        // Vou tentar esse de cima, caso dê errado uso o de baixo
        //if (query.rows[0]) return query.rows;
        //throw new Error("No rows returned");
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
        return query.rows;
        // Vou tentar esse de cima, caso dê errado uso o de baixo
        //if (query.rows[0]) return query.rows;
        //throw new Error("No rows returned");
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

//
//
//
/*OBJET THAT I HAS BEEN USED TO DO REQUEST*/

function getGodsByIdCategory(index) {
    const allData = [
        {
            name: "Deuses da tecnologia",
            data: [
                {
                    godName: "god-10",
                    status: "status-10",
                    src: "cat01--god01-tec.jpg",
                },
                {
                    godName: "god-11",
                    status: "status-11",
                    src: "cat01--god02-tec.jpg",
                },
                {
                    godName: "god-12",
                    status: "status-12",
                    src: "cat01--god03-tec.jpg",
                },
                {
                    godName: "god-13",
                    status: "status-13",
                    src: "cat01--god04-tec.jpg",
                },
            ],
        },
        {
            name: "Deuses da saúde",
            data: [
                {
                    godName: "god-00",
                    status: "status-00",
                    src: "cat02--god01-saude.jpg",
                },
                {
                    godName: "god-01",
                    status: "status-01",
                    src: "cat02--god02-saude.jpg",
                },
                {
                    godName: "god-02",
                    status: "status-02",
                    src: "cat02--god03-saude.jpg",
                },
                {
                    godName: "god-03",
                    status: "status-03",
                    src: "cat02--god04-saude.jpg",
                },
            ],
        },

        {
            name: "Deuses da natureza",
            data: [
                {
                    godName: "god-20",
                    status: "status-20",
                    src: "cat03--god01-natu.jpg",
                },
                {
                    godName: "god-21",
                    status: "status-21",
                    src: "cat03--god02-natu.jpg",
                },
                {
                    godName: "god-22",
                    status: "status-22",
                    src: "cat03--god03-natu.jpg",
                },
                {
                    godName: "god-23",
                    status: "status-23",
                    src: "cat03--god04-natu.jpg",
                },
            ],
        },
        {
            name: "Deuses da comida",
            data: [
                {
                    godName: "god-30",
                    status: "status-30",
                    src: "cat04--god01-comida.jpg",
                },
                {
                    godName: "god-31",
                    status: "status-31",
                    src: "cat04--god02-comida.jpg",
                },
                {
                    godName: "god-32",
                    status: "status-32",
                    src: "cat04--god03-comida.jpg",
                },
                {
                    godName: "god-33",
                    status: "status-33",
                    src: "cat04--god04-comida.jpg",
                },
            ],
        },
        {
            name: "Deuses do caos",
            data: [
                {
                    godName: "god-40",
                    status: "status-40",
                    src: "cat05--god01-caos.jpg",
                },
                {
                    godName: "god-41",
                    status: "status-41",
                    src: "cat05--god02-caos.jpg",
                },
                {
                    godName: "god-42",
                    status: "status-42",
                    src: "cat05--god03-caos.jpg",
                },
                {
                    godName: "god-43",
                    status: "status-43",
                    src: "cat05--god04-caos.jpg",
                },
            ],
        },
    ];

    return allData[index];
}
