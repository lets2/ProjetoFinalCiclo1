import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/
//
export function RegisterUser() {
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
        <div class="flex-row-center" id="container-register-user">
            <form action="" class="flex-col-center" id="form-register-user">
                <p id="tittle-register-user">Cadastrar</p>
                <div class="flex-col-center" id="box-register-user">
                    <input id="new-name-user" class="input-add-user" type="text" placeholder="Username">
                    <input id="new-email-user" class="input-add-user" type="email" placeholder="Email">
                    <input id="new-passwd-user" class="input-add-user" type="password" placeholder="Password">
                </div>
                <div class="flex-row-between" id="box-buttons-user">
                    <button class="cancel-button-register btns-add-user">Cancelar</button>
                    <button class="btns-add-user" id="add-user-button">Cadastrar</button>
                </div>
                <p id= "message-register-user"></p>
            </form>
        </div>
    </main>
    <footer></footer>`;

    return div;
}

export function redirectToMyPrincipal() {
    const eventStateChange = CriaEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}