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

const TAG = "Main Repository: ";

exports.getAll = async () => {
    //Cria array de objetos simuladosapenas para testes:
    const arrayRows = getRows();
    //Realiza a requisição
    try {
        const query = await new Promise((resolve) => setTimeout(resolve, 1000));
        //Se a requisição deu certo existe pelo menos um row
        const deuCerto = true;
        if (deuCerto) return Promise.resolve(arrayRows);
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
            { name: "Deuses da Tecnologia", src: "templo_tecnologia.JPG" },
            { name: "Deuses da Saúde", src: "templo_saude.JPG" },
            { name: "Deuses da Natureza", src: "templo_natureza.JPG" },
            { name: "Deuses da Comida", src: "templo_comida.JPG" },
            { name: "Deuses do Caos", src: "templo_caos.JPG" },
        ],
    };
    return arrayRows;
}
