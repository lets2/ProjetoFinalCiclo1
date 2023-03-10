import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/
//
export function EditCategory() {
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
    <main>
        <div class="container-edit-category flex-center-center">
            <div id="container-edit-cat" class="container-edit-cat flex-row-center"> 

                <div id="box-preview-img-cat" class="flex-col-center">
                    <div id="edit-page-cat-img">
                        <img id="preview-img-cat" src="../assets/images/JPG-PLACEHOLDER-templo.jpg" alt="">
                    </div>
                    
                    <input id="insert-file-btn-cat" type="file" name="file" accept="image/png, image/jpeg, image/jpg">
                    <label for="insert-file-btn-cat" id="custom-file-upload">Escolha um arquivo</label>
                    <p id="message-input-file-cat"></p>
                </div>

                <div class="form-edit-category nome-categoria-edit cor-categoria-edit">

                    <input id="new-name-category" type="text" placeholder="Nome da categoria">
                    <select name="select-color-category-edit" id="select-color-category-edit">
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

                    <div class=" box-btns-edit-cat flex-row-between">

                        <button id="cancel-cat" class="btns-edit-cat" type="submit">Cancelar</button>
                        <button id="edit-category" class="btns-edit-cat" type="submit">Editar</button>

                    </div>
                    
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

export function insertChoosedCategoryTempleImg(holder = true) {
    const fileBtn = document.querySelector("#insert-file-btn-cat");
    const previewImg = document.querySelector("#preview-img-cat");
    const message = document.querySelector("#message-input-file-cat");

    message.innerHTML = "";
    if(holder){
        previewImg.src = "../assets/images/JPG-PLACEHOLDER-templo.jpg";
    }

    addUniqueEventListener(fileBtn, "change", (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            previewImg.src = url;
            message.innerHTML = file.name;
        } else {
            message.innerHTML = "Nenhum arquivo escolhido";
        }
    });
}

export function testInserirElementosNaEditCategoryPage(catInformation) {
    const inputCatEditName = document.querySelector("#new-name-category");

    inputCatEditName.value = catInformation.name;
    // inputCatEditColor.value = catInformation.hex_color;
    //

    const containerImgGod = document.querySelector("#edit-page-cat-img");
    containerImgGod.innerHTML = `
    <img id="preview-img-cat" src="../assets/uploads/${catInformation.src}" alt="">
    `;

    const containerEditCategory = document.querySelector(".container-edit-cat");
    containerEditCategory.dataset.id = catInformation.id; //add-set
}

//Adicionando eventos

/*@author:Gabriela - coauthor: Letônio*/
import { addEventsToHeader, displayWarning } from "../index.js";
import { redirectToTableEditCategories } from "./table_categories.js";

export function addEventsToEditCategoryPage() {
    addEventsToHeader();
    const btnCancel = document.querySelector("#cancel-cat");
    addUniqueEventListener(btnCancel, "click", () => {
        redirectToTableEditCategories();
    });
    //

    const btnEditCategory = document.querySelector("#edit-category");
    addUniqueEventListener(btnEditCategory, "click", async () => {
        //

        const id = document.querySelector(".container-edit-cat").dataset.id;
        const editSuccess = await updateCategoryInformationInDatabase(id);

        if (editSuccess) {
            redirectToTableEditCategories();
        }
    });
}
//

async function updateCategoryInformationInDatabase(id) {
    const formData = getCategoryInputInformations(id);

    //FETCH
    try {
        const response = await fetch(`/categoriestable/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();

        displayWarning(resJson.message);

        return true;
        //
    } catch (error) {
        console.log(error);
        return false;
    }
}

function getCategoryInputInformations(id) {
    let obj = {};

    const inputNameUpdate = document.querySelector("#new-name-category").value;

    const inputColorUpdate = document.querySelector(
        "#select-color-category-edit"
    ).value;

    obj.src = "JPG-PLACEHOLDER-templo.jpg";

    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    formData.append("file", fileInput.files[0]);

    formData.append("name", inputNameUpdate);
    formData.append("hexColor", inputColorUpdate);

    return formData;
}
