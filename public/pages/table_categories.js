import CriaEventStateChange from "./event-url.js";

/*@author:filipe - coauthor: Letônio*/

export function TableCategories() {
    const div = document.createElement("div");

    div.innerHTML = `
	<header class="flex-row-between">
        <div class="header-items flex-row-center logo-search">
            <img id="logo" src="../assets/icons/logo-godpedia.png" alt="">
            <div class="container-search flex-row-center">
            <input class="search-input" type="text"> 
            <div class="search">
                    <img class="search-icon" src="../assets/icons/search.svg" alt="">
            </div>
            </div>
        </div>
        <div class="header-items flex-row-end menu-icon-div">
            <img id="profile-icon" src="../assets/icons/profile.svg" alt="">
            <img id="menu-icon" src="../assets/icons/menu.svg" alt="">
        </div>
    </header>
    <main class="flex-center-center">
        <div class="container-content-categories flex-col-center">
               
            <button id="create-new-category">Criar categoria</button>

            <div class="container-table" id= "div-table-categories">
                <table id="table-categories">
                    <thead>
                        <tr>
                            <th>CATEGORIA</th>
                            <th>EDITAR</th>
                            <th>APAGAR</th>
                        </tr>
                    </thead>
                    <tbody id="thead-categories">
                        
                    </tbody>
                </table>
            </div>        
        </div>
        

    </main>
    <footer></footer>
	`;

    return div;
}

/*@author:Filipe - coauthor: Letônio*/

export function redirectToTableEditCategories() {
    const eventStateChange = CriaEventStateChange("/tableCategories");
    window.dispatchEvent(eventStateChange);
}

//EVENTOS RELACIONADOS COM A ADICAO DE LINHAS NAS TABELAS, ALÉM DOS EVENTOS
//DE QUANDO CLICAMOS NO LAPIS OU NA LIXEIRA, REDIRECIONAR PARA A PAGINA DE EDICAO
//OU DELETAR A CATEGORIA
import { addEventsToHeader, displayWarning } from "../index.js";
import { addUniqueEventListener } from "../utils/event-listener.js";
import { redirectToEditCategory } from "./edit-cat.js";
import { redirectToAddCategory } from "./add-category.js";
// author: Gabriela
export function addLinesCategoryTable(data) {
    const thead = document.querySelector("#thead-categories");
    thead.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        thead.innerHTML += `<tr id="catline0${i}">
                    <td>${data[i].name}</td>
                    <td><img class="edit-btn" src="../assets/icons/pencil-black.svg" alt="pencil icon"></td>
                    <td><img class="delete-btn" src="../assets/icons/trash-black.svg" alt="trash icon"></td>
                </tr>`;
        const lineTable = document.querySelector(`#catline0${i}`); //get line by #id
        lineTable.dataset.id = data[i].id;
    }

    //Chama funcao para add eventos nos botoes de LAPIS/PENCIL;
    adicionaEventosNosLapis();
}

function adicionaEventosNosLapis() {
    ///EVENTOS RELACIONADOS a EDITAR CATEGORIA BOTAO!!!!
    const listaDeImagensDeLapis = document.querySelectorAll(".edit-btn");

    listaDeImagensDeLapis.forEach((imgLapis) => {
        addUniqueEventListener(imgLapis, "click", (event) => {
            const catId = event.target.parentNode.parentNode.dataset.id;
            redirectToEditCategory(catId);
        });
    });
    ///EVENTOS REALCIONADO A EXCLUIR CATEGORIA BOTAO!!!!!11
    const listaDeImagensDeLixeira = document.querySelectorAll(".delete-btn");

    listaDeImagensDeLixeira.forEach((imgLixeira) => {
        addUniqueEventListener(imgLixeira, "click", (event) => {
            const catId = event.target.parentNode.parentNode.dataset.id;

            deleteCategoryFromDatabase(catId);
            redirectToTableEditCategories();
        });
    });
}

async function deleteCategoryFromDatabase(id) {
    try {
        const response = await fetch(
            `http://localhost:8080/categoriestable/${id}/`,
            {
                method: "DELETE",
            }
        );

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        console.log("DELETE CATEGORY deu certo:", resJson);
        displayWarning(resJson.message); //deu tudo  certo

        const container_data = document.querySelector("#container-see-god");
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

/*@author:filipe - coauthor: gabriela*/
/*Adicionando eventos na página que tem uma tabela de categorias*/

export function addEventsToCategoryTablePage() {
    addEventsToHeader();
    //addLinesCategoryTable();
    //insere evento no botao de add categoria

    const btnAddCategory = document.querySelector("#create-new-category");

    addUniqueEventListener(btnAddCategory, "click", () => {
        redirectToAddCategory();
    });
}
