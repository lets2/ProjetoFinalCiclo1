import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/
//
export function EditPasswd() {
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
        <div class="flex-row-center" id="container-change-passwd">
            <form action="" id="form-change-passwd">
                <p id="tittle-change-passwd">Alterar Senha</p>
                <div class="flex-col-center" id="box-change-passwd">
                    <input id="check-name-user" class="input-change-passwd" type="text" placeholder="Nome de usuário">
                    <input id="old-passwd-user" class="input-change-passwd" type="password" placeholder="Senha">
                    <input id="new-passwd-user" class="input-change-passwd" type="password" placeholder="Nova senha">
                    <input id="new-passwd-repeated" class="input-change-passwd" type="password" placeholder="Confirme a nova senha">
                </div>
                <div class="flex-row-between" id="box-buttons-user">
                    <button class="cancel-button-passwd btns-change-passwd">Cancelar</button>
                    <button class="btns-change-passwd" id="edit-passwd-button">Alterar</button>
                </div>
                <p id= "message-change-passwd"></p>
            </form>
        </div>
    </main>
    <footer></footer>`;

    return div;
}

export function redirectToEditPasswd() {
    const eventStateChange = CriaEventStateChange("/editPassword");
    window.dispatchEvent(eventStateChange);
}

import { addUniqueEventListener } from "../utils/event-listener.js";
import { addEventsToHeader, displayWarning } from "../index.js";
import { redirectToMenuAdmPage } from "./adm_perfil_sidebar.js";


export function addEventsToEditPasswd(){
    addEventsToHeader();
   
    const cancelButton = document.querySelector(".cancel-button-passwd");
    addUniqueEventListener(cancelButton, "click", () => {
        redirectToMenuAdmPage();
    });

    const changePasswdBtn = document.querySelector("#edit-passwd-button");
    addUniqueEventListener(changePasswdBtn, "click", async (e) => {
        e.preventDefault();
        try {
            const username = document.querySelector("#check-name-user").value;
            const oldPassword = document.querySelector("#old-passwd-user").value;
            const newPassword = document.querySelector("#new-passwd-user").value;
            const newPasswdAgain = document.querySelector("#new-passwd-repeated").value;
            const message = document.querySelector("#message-change-passwd");

            if(newPassword !== newPasswdAgain){
                message.innerHTML = "Os campos 'Nova senha' e 'Repita a nova senha' devem ser iguais!";
                throw "Erro: as senhas não coincidem!"
            }
            message.innerHTML = "";
            const data = await tryChangePasswd(username, oldPassword, newPassword);

            displayWarning(data.message); //deu tudo  certo
            redirectToMenuAdmPage();
        } catch (error) {
            console.log(error);
        } 
    });
}

async function tryChangePasswd(_username, _password, _newPassword) {
    const objBody = {
        username: _username,
        oldPassword: _password,
        newPassword: _newPassword,
    };

    try {
        const response = await fetch("/changePassword", {
        method: "PUT",
        body: JSON.stringify(objBody),
        headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        
        if (response.status !== 200 && response.status !== 201) {
            throw "[erro] ao tentar fazer login!";
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.log(error, "deu ruim");
    }
}