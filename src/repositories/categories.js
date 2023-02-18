/*
TRUE DATABASE WILL BE INSERTED NEXT WEEK
Use this code:
const pool = require("./db-pool");

const TAG = "All Repository: ";

exports.getAll = async () => {
    //Realiza a requisição
    try {
        const query = await pool.query("SELECT * FROM users");
        //Se a requisição deu certo existe pelo menos um row
        if (query.rows[0]) return query.rows;
        throw new Error("No rows returned");
        //se a condição anterior for falsa, implica que
        //nenhuma coluna foi retornada, sendo que
        //o front end esta esperado uma resposta com rows
    } catch (error) {
        console.log("TAG,error");
        throw error;
    }
};


*/
const pool = require("./db-pool");

const TAG = "categories Repository: ";

exports.getAll = async () => {
    //Cria array de objetos simuladosapenas para testes:
    const arrayRows = getRows();
    //Realiza a requisição
    try {
        const query = await pool.query(
            "SELECT id,name,src_img as src FROM categories;"
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

/*
const TAG = "categories Repository: ";

exports.getAll = async () => {
    //Cria array de objetos simuladosapenas para testes:
    const arrayRows = getRows();
    //Realiza a requisição
    try {
        const query = await new Promise((resolve) => setTimeout(resolve, 1000));
        //Se a requisição deu certo existe pelo menos um row
        const deuCerto = true;
        if (deuCerto) return Promise.resolve(arrayRows.rows);
        throw new Error("No rows returned");
        //se a condição anterior for falsa, implica que
        //nenhuma coluna foi retornada, sendo que
        //o front end esta esperado uma resposta com rows
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};




 */

exports.getByIndex = async (id) => {
    //Cria array de objetos simuladosapenas para testes:
    ////const arrayRows = getRows();
    //Realiza a requisição
    try {
        const query = await pool.query("SELECT ");
        //Se a requisição deu certo existe pelo menos um row
        const deuCerto = true;
        console.log("Deu certo e o resultado é", arrayRows.rows, id);
        if (deuCerto) return Promise.resolve(arrayRows.rows[id]);
        throw new Error("No rows returned");
        //se a condição anterior for falsa, implica que
        //nenhuma coluna foi retornada, sendo que
        //o front end esta esperado uma resposta com rows
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

// função que contém o objeto com informações
function getRows() {
    const arrayRows = {
        rows: [
            { name: "Deuses da tecnologia", src: "templo_tecnologia.jpg" },
            { name: "Deuses da saúde", src: "templo_saude.jpg" },
            { name: "Deuses da natureza", src: "templo_natureza.jpg" },
            { name: "Deuses da comida", src: "templo_comida.jpg" },
            { name: "Deuses do caos", src: "templo_caos.jpg" },
        ],
    };
    return arrayRows;
}

exports.getAllGodsByIndex = async (id) => {
    //Cria array de objetos simuladosapenas para testes:
    // const comprimento = 5; //comprimento do array de dados
    // const arrayRows = getGodsByIndexCategory(index);
    //Realiza a requisição
    try {
        const query = await pool.query(
            "SELECT gods.id, gods.name, gods.status, gods.resume, gods.category_id, categories.name AS name_category, gods.src_img FROM gods JOIN categories ON categories.id = gods.category_id WHERE gods.category_id = $1;",
            [id]
        );
        if (query.rows[0]) return query.rows;
        throw new Error("No rows returned");
        //Se a requisição deu certo existe pelo menos um row
        // const deuCerto = true;
        //console.log("Deu certo e o resultado é", query.rows, id);
        //if (deuCerto) return Promise.resolve(arrayRows.rows[id]);
        //throw new Error("No rows returned");
        //se a condição anterior for falsa, implica que
        //nenhuma coluna foi retornada, sendo que
        //o front end esta esperado uma resposta com rows
    } catch (error) {
        console.log(TAG, error);
        throw error;
    }
};

function getGodsByIndexCategory(index) {
    const allData = [
        {
            "Deuses da tecnologia": [
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
            "Deuses da saúde": [
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
            "Deuses da natureza": [
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
            "Deuses da comida": [
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
            "Deuses do caos": [
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

    /*


    const arrayRows = {
        rows: [
            { name: "Deuses do caos", src: "templo_caos.jpg" },
            { name: "Deuses da tecnologia", src: "templo_tecnologia.jpg" },
            { name: "Deuses da saúde", src: "templo_saude.jpg" },
            { name: "Deuses da natureza", src: "templo_natureza.jpg" },
            { name: "Deuses da comida", src: "templo_comida.jpg" },
        ],
    };
*/
    return allData[index];
}
