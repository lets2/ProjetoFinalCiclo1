import CriaEventStateChange from "./event-url.js";

/*@author:gabriela - coauthor: Letônio*/

export function AddGod() {
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
        <!-- @author: Gabriela-->
        <div class="flex-row-center" id="container-edit-god">
            <div class="flex-col-center" id="box-img-god">
                <div>
                    <img id="preview-img-god" src="../assets/images/JPG-PLACEHOLDER-DEUS.jpg" alt="">
                </div>
                <input id="insert-file-btn" type="file" name="file" accept="image/png, image/jpeg, image/jpg">
                <label for="insert-file-btn" class="custom-file-upload">Escolha um arquivo</label>
                <p id="message-input-file"></p>
            </div>
            <form action="" class="flex-col-center" id="form-add-god">
                <div class="flex-col-center" id="box-inputs-add-god">

                    <select name="filter-category" id="select-filter-category"  class="input-add-god">
                        <option value="1">Escolha uma categoria</option>
                        <option value="2">Deuses da Tecnologia</option>
                        <option value="3">Deuses da Alimentação</option>
                        <option value="4">Deuses do Caos</option>
                        <option value="5">Health</option>
                    </select>

                    <input id="new-name-god" class="input-add-god" type="text" placeholder="Nome">
                    <input id="new-status-god" class="input-add-god" type="text" placeholder="Status">
                    <textarea id="new-resume-god" class="input-add-god" name="new-resume-god" cols="38" rows="10" placeholder="Resumo"></textarea>
                </div>
                <div class="flex-row-between" id="box-buttons">
                    <button class="cancel-button btns-add-god">Cancelar</button>
                    <button class="btns-add-god" id="add-god-button">Adicionar</button>
                </div>
            </form>
        </div>
    </main>
    <footer></footer>
	`;

    return div;
}

/*@author:Gabriela - coauthor: Letônio*/

export function redirectToAddGodPage() {
    const eventStateChange = CriaEventStateChange("/addGod");
    window.dispatchEvent(eventStateChange);
}

//CHamando função que adiciona imagem do deus:

import { addUniqueEventListener } from "../utils/event-listener.js";
import { addEventsToHeader, displayWarning } from "../index.js";
import { redirectToTableEditGods } from "./table_gods.js";
export function insertChoosedGodImg() {
    const fileBtn = document.querySelector("#insert-file-btn");
    const previewImg = document.querySelector("#preview-img-god");
    const message = document.querySelector("#message-input-file");

    message.innerHTML = "";
    
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

//Função para limpar os inputs do formulário, para que não fique
export function clearInputFromFormAddGod() {
    const inputNewNameGod = document.querySelector("#new-name-god");
    inputNewNameGod.value = ""; //clear previous content
    const inputNewStatusGod = document.querySelector("#new-status-god");
    inputNewStatusGod.value = ""; //clear previous content
    const inputNewResumeGod = document.querySelector("#new-resume-god");
    inputNewResumeGod.value = ""; //clear previous content
}

//FUncoes para adicionar eventos noADD GOD PAGE

/*@author:Gabriela - coauthor: Letônio*/
/*Add eventos na página que tem a opcao de adicionar um novo deus*/

export function addEventsToAddNewGodPage() {
    addEventsToHeader();
    //evento nos botoes de adicionar e cancelar
    const cancelButton = document.querySelector(".cancel-button");
    const addGodButton = document.querySelector("#add-god-button");
    addUniqueEventListener(cancelButton, "click", () => {
        redirectToTableEditGods();
    });
    addUniqueEventListener(addGodButton, "click", async (e) => {
        e.preventDefault();
        const addSuccess = await addNewGodInDatabase();
        console.log("FLAG DE SUCESSO ADD GOD:", addSuccess);
        //Antes de redirecionar devemos adicionar o novo deus
        if (addSuccess) {
            redirectToTableEditGods();
        }
    });
}

async function addNewGodInDatabase() {
    const newNameGod = document.querySelector("#new-name-god").value;
    const newStatusGod = document.querySelector("#new-status-god").value;
    const newResumeGod = document.querySelector("#new-resume-god").value;

    //const srcExample = "exampleGod.png";
    // const categoryId = "1"; //Precisamos modificar a página para receber categoria também
    const categoryId = document.querySelector("#select-filter-category").value;
    console.log("OLHA O ID DA CATEGORIA QUE ESCOLHI", categoryId);
    console.log(
        "OLHA O NOME DA CATEGORIA QUE ESCOLHI",
        document.querySelector("#select-filter-category").innerText
    );

    //Tentando fazer a adicão de arquivo:
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    // Adiciona a imagem ao FormData
    formData.append("file", fileInput.files[0]);

    // Adiciona as 4 strings ao FormData
    formData.append("name", newNameGod);
    formData.append("status", newStatusGod);
    formData.append("resume", newResumeGod);
    formData.append("categoryId", categoryId);

    try {
        const response = await fetch("/godstable", {
            method: "POST",
            body: formData,
            //headers: { "Content-type": "application/json; charset=UTF-8" },
        });

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
