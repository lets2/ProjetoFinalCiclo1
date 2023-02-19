import CriaEventStateChange from "./event-url.js";

/*@author:gabriela - coauthor: Letônio*/

export function AddGod() {
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
    <main class="flex-center-center">
        <!-- @author: Gabriela-->
        <div class="flex-row-center" id="container-edit-god">
            <div class="flex-col-center" id="box-img-god">
                <div>
                    <img src="../assets/images/games-god.jpg" alt="">
                </div>
                <button class="btns-add-god">Mudar imagem</button>
            </div>
            <form action="" class="flex-col-center">
                <div class="flex-col-center" id="box-inputs-add-god">
                    <input id="new-name-god" class="input-add-god" type="text" placeholder="Nome">
                    <input id="new-status-god" class="input-add-god" type="text" placeholder="Status">
                    <input id="new-resume-god" class="input-add-god" id="input-resume-add-god"type="text" placeholder="Resumo">
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

export function redirectToMyPrincipal() {
    const eventStateChange = CriaEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}
