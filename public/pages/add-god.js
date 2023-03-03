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

import { addUniqueEventListener } from "../utils/event-listener.js";
import { addEventsToHeader, displayWarning } from "../index.js";
import { redirectToTableEditGods } from "./table_gods.js";
export function insertChoosedGodImg(holder = true) {
    const fileBtn = document.querySelector("#insert-file-btn");
    const previewImg = document.querySelector("#preview-img-god");
    const message = document.querySelector("#message-input-file");

    message.innerHTML = "";
    if(holder){
        previewImg.src = "../assets/images/JPG-PLACEHOLDER-DEUS.jpg"
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

export function clearInputFromFormAddGod() {
    const inputNewNameGod = document.querySelector("#new-name-god");
    inputNewNameGod.value = ""; //clear previous content
    const inputNewStatusGod = document.querySelector("#new-status-god");
    inputNewStatusGod.value = ""; //clear previous content
    const inputNewResumeGod = document.querySelector("#new-resume-god");
    inputNewResumeGod.value = ""; //clear previous content
}

/*@author:Gabriela - coauthor: Letônio*/

export function addEventsToAddNewGodPage() {
    addEventsToHeader();

    const cancelButton = document.querySelector(".cancel-button");
    const addGodButton = document.querySelector("#add-god-button");
    addUniqueEventListener(cancelButton, "click", () => {
        redirectToTableEditGods();
    });
    addUniqueEventListener(addGodButton, "click", async (e) => {
        e.preventDefault();
        const addSuccess = await addNewGodInDatabase();

        if (addSuccess) {
            redirectToTableEditGods();
        }
    });
}

async function addNewGodInDatabase() {
    const newNameGod = document.querySelector("#new-name-god").value;
    const newStatusGod = document.querySelector("#new-status-god").value;
    const newResumeGod = document.querySelector("#new-resume-god").value;

    const categoryId = document.querySelector("#select-filter-category").value;

    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');

    formData.append("file", fileInput.files[0]);

    formData.append("name", newNameGod);
    formData.append("status", newStatusGod);
    formData.append("resume", newResumeGod);
    formData.append("categoryId", categoryId);

    try {
        const response = await fetch("/godstable", {
            method: "POST",
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
    } catch (error) {
        console.log(error);
        return false;
    }
}
