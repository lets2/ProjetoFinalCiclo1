import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/

export function AddCategory() {
    const div = document.createElement("div");

    div.innerHTML = `
	<header class="flex-row-between">
        <div class="header-items flex-row-between">
            <img id="logo" src="../assets/icons/logo-godpedia.png" alt="">
            <div class="container-search flex-row-center">
               <input class="search-input" type="text"> 
               <img class="search-icon" src="../assets/icons/search.svg" alt="">
            </div>
        </div>
        <div class="header-items flex-row-between">
            <img id="profile-icon" src="../assets/icons/profile.svg" alt="">
            <img id="menu-icon" src="../assets/icons/menu.svg" alt="">
        </div>
    </header>
    <main>
        <div class="container-carousel flex-center-center">

            <div class="retangulo">
            </div>

            <div class="p2-background flex-col-justify-center"> 

                <div class="nome-categoria cor-categoria flex-col-center">

                    <input id="new-name-category" type="text" placeholder="Nome da categoria">
                    <select name="select-color-category" id="select-color-category">
                        <option value="#140A3D" selected disabled>Cor:</option>
                        <option value="#140A3D">Azul escuro</option>
                        <option value="#0B264F">Azul claro</option>
                        <option value="#024324">Verde</option>
                        <option value="#ff8e01">Laranja</option>
                        <option value="#815604">Amarelo</option>
                        <option value="#931212">Vermelho</option>   
                        <option value="#6C0000">Vinho</option>
                        <option value="#43064E">Roxo</option>
                        <option value="#000000">Preto</option>
                    </select>
                    <div>
                        <img id="preview-img-god" src="../assets/images/exampleTemple.png" alt="">
                    </div>
                    
                    <input id="insert-file-btn" type="file" name="file" accept="image/png, image/jpeg, image/jpg">
                    <label for="insert-file-btn" class="custom-file-upload">Escolha um arquivo</label>
                    <p id="message-input-file"></p>

                </div>

                <div class="button-cancelar button-adicionar flex-row-between">

                    <button id="Cancelar" type="submit">Cancelar</button>
                    <button id="Adicionar" type="submit">Adicionar</button>

                </div>
            </div>
        </div>
    </main>
    <footer></footer>
	`;

    return div;
}

/*--------------------------------------------*/

/*@author:Gabriela - coauthor: Letônio*/

export function redirectToAddCategory() {
    const eventStateChange = CriaEventStateChange("/addCategory");
    window.dispatchEvent(eventStateChange);
}

//Adicionando eventos na add-category

/*@author:Gabriela - coauthor: Letônio*/
// Add eventos na página de adicionar categoria
import { addEventsToHeader, displayWarning } from "../index.js";
import { addUniqueEventListener } from "../utils/event-listener.js";
import { redirectToTableEditCategories } from "./table_categories.js";

export function addEventsToAddCategoryPage() {
    addEventsToHeader();
    const btnCancel = document.querySelector("#Cancelar");
    addUniqueEventListener(btnCancel, "click", () => {
        redirectToTableEditCategories();
    });
    const btnAddCategory = document.querySelector("#Adicionar");
    addUniqueEventListener(btnAddCategory, "click", async () => {
        await addNewCategoryInDatabase();
        redirectToTableEditCategories();
    });
}

/*@author:letonio - Adiciona no Banco de dados a nova categoria criada*/

async function addNewCategoryInDatabase() {
    const newCategoryName = document.querySelector("#new-name-category").value;

    const newColorHexFormat = document.querySelector(
        "#select-color-category"
    ).value;

    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    // Add image to FormData
    formData.append("file", fileInput.files[0]);

    // Add strings to FormData
    formData.append("name", newCategoryName);
    formData.append("hexColor", newColorHexFormat);

    try {
        const response = await fetch("http://localhost:8080/categoriestable", {
            method: "POST",
            body: formData,
        });

        console.log("TESTE RESPOSTA OBTIDA AO CRIAR CATEGORIA:", response);

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        displayWarning(resJson.message); //deu tudo  certo
    } catch (error) {
        console.log(error);
    }
}
