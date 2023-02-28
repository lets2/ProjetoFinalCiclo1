import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/

export function AddCategory() {
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
        <div class="container-add-category flex-center-center">
            <div id="container-add-cat" class="container-add-cat flex-row-center"> 

                <div id="box-preview-img-cat" class="flex-col-center">
                    <div>
                        <img id="preview-img-cat" src="../assets/images/JPG-PLACEHOLDER-templo.jpg" alt="">
                    </div>
                    
                    <input id="insert-file-btn-cat" type="file" name="file" accept="image/png, image/jpeg, image/jpg">
                    <label for="insert-file-btn-cat" id="custom-file-upload">Escolha um arquivo</label>
                    <p id="message-input-file-cat"></p>
                </div>

                <div class="form-add-category nome-categoria-add cor-categoria-add">

                    <input id="new-name-category" type="text" placeholder="Nome da categoria">
                    <select name="select-color-category-add" id="select-color-category-add">
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

                    <div class=" box-btns-add-cat flex-row-between">

                        <button id="cancel-cat" class="btns-add-cat" type="submit">Cancelar</button>
                        <button id="add-category" class="btns-add-cat" type="submit">Adicionar</button>

                    </div>
                    
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

//Função para limpar os inputs do formulário, para que não fique
export function clearInputFromFormAddCategory() {
    const inputNewNameCategory = document.querySelector("#new-name-category");
    inputNewNameCategory.value = ""; //clear previous content
    const selectTag = document.querySelector("#select-color-category-add");
    selectTag.options[0].selected = true; //Deixa a opção "cor" selecionada
}

export function insertChoosedCatImg() {
    const fileBtn = document.querySelector("#insert-file-btn-cat");
    const previewImg = document.querySelector("#preview-img-cat");
    const message = document.querySelector("#message-input-file-cat");

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

export function addEventsToAddCategoryPage() {
    addEventsToHeader();
    const btnCancel = document.querySelector("#cancel-cat");
    addUniqueEventListener(btnCancel, "click", () => {
        redirectToTableEditCategories();
    });
    const btnAddCategory = document.querySelector("#add-category");
    addUniqueEventListener(btnAddCategory, "click", async () => {
        const addSuccess = await addNewCategoryInDatabase();
        console.log("FLAG DE SUCESSO ADD CATEGORY:", addSuccess);
        //Antes de redirecionar devemos adicionar o novo deus
        if (addSuccess) {
            redirectToTableEditCategories();
        }
    });
}

/*@author:letonio - Adiciona no Banco de dados a nova categoria criada*/

async function addNewCategoryInDatabase() {
    const newCategoryName = document.querySelector("#new-name-category").value;

    const newColorHexFormat = document.querySelector(
        "#select-color-category-add"
    ).value;

    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    // Add image to FormData
    formData.append("file", fileInput.files[0]);

    // Add strings to FormData
    formData.append("name", newCategoryName);
    formData.append("hexColor", newColorHexFormat);

    try {
        const response = await fetch("/categoriestable", {
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
        //Se deu tudo certo, o modal acima mostra uma mensagem de sucesso e retorna true
        return true;
    } catch (error) {
        console.log(error);
        return false; //Não obteve sucesso ao tentar add, logo não podera ir para tabela
    }
}
