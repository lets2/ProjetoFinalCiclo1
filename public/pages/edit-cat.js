import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/
//
export function EditCategory() {
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

            <div id="container-edit-category" class="p3-background flex-col-justify-center"> 

                <div class="nome-categoria cor-categoria flex-col-center">

                    <input id="input-cat-edit-name" type="text" placeholder="Nome da categoria">
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
                    <button id="Atualizar" type="submit">Atualizar</button>

                </div>
            </div>
        </div>
    </main>
    <footer></footer>
	`;

    return div;
}

/*@author:Gabriela - coauthor: Letônio*/

export function redirectToEditCategory(id) {
    const eventStateChange = CriaEventStateChange("/editCategory", { id: id });
    window.dispatchEvent(eventStateChange);
}

/*CATEGORY IMAGE PREVIEW */
import { addUniqueEventListener } from "../utils/event-listener.js";

//no index, essa funcao é usada tanto para o case /editcategory, como /addcategory
export function insertChoosedCategoryTempleImg() {
    const fileBtn = document.querySelector("#insert-file-btn");
    const previewImg = document.querySelector("#preview-img-god");
    const message = document.querySelector("#message-input-file");

    addUniqueEventListener(fileBtn, "change", (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            previewImg.src = url;
            message.innerHTML = file.name;
            console.log("fileBTN", file.name);
        } else {
            message.innerHTML = "Nenhum arquivo escolhido";
        }
    });
}

export function testInserirElementosNaEditCategoryPage(catInformation) {
    const inputCatEditName = document.querySelector("#input-cat-edit-name");
    // const inputCatEditColor = document.querySelector("#input-cat-edit-color");
    inputCatEditName.value = catInformation.name;
    // inputCatEditColor.value = catInformation.hex_color;
    //
    const containerEditCategory = document.querySelector(
        "#container-edit-category"
    );
    containerEditCategory.dataset.id = catInformation.id; //add-set
}

//Adicionando eventos

/*@author:Gabriela - coauthor: Letônio*/
// Add eventos na página de editar categoria
import { addEventsToHeader, displayWarning } from "../index.js";
import { redirectToTableEditCategories } from "./table_categories.js";

export function addEventsToEditCategoryPage() {
    addEventsToHeader();
    const btnCancel = document.querySelector("#Cancelar");
    addUniqueEventListener(btnCancel, "click", () => {
        redirectToTableEditCategories();
    });
    //
    // #Adicionar;
    const btnEditCategory = document.querySelector("#Atualizar");
    addUniqueEventListener(btnEditCategory, "click", () => {
        //
        //pegar o id que está armazenado num data-set
        const id = document.querySelector("#container-edit-category").dataset
            .id;
        updateCategoryInformationInDatabase(id);

        redirectToTableEditCategories();
    });
}
//

async function updateCategoryInformationInDatabase(id) {
    const formData = getCategoryInputInformations(id);

    //FETCH

    try {
        const response = await fetch(
            `http://localhost:8080/categoriestable/${id}`,
            {
                method: "PUT",
                body: formData,
            }
        );
        console.log("RESPOSTA DA REQUISIÇÃO EDIT CATEGORY:", response.status);

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        console.log("Requisição de EDIT CATEGORY deu certo:", resJson);
        displayWarning(resJson.message); //deu tudo  certo
    } catch (error) {
        console.log(error);
    }
}

function getCategoryInputInformations(id) {
    //provavelmente apagarei esse obj, já qu tudo está sendo armazenado no formdata
    let obj = {};

    const inputNameUpdate = document.querySelector(
        "#input-cat-edit-name"
    ).value;

    const inputColorUpdate = document.querySelector(
        "#select-color-category"
    ).value;

    obj.src = "ExampleTemple.png";

    //MOntando o formData para fazer a edição de categoria:
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    // Adiciona a imagem ao FormData
    formData.append("file", fileInput.files[0]);

    // Adiciona as 4 strings ao FormData
    formData.append("name", inputNameUpdate);
    formData.append("hexColor", inputColorUpdate);

    return formData;
}
