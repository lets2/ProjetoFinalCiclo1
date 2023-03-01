import CriaEventStateChange from "./event-url.js";

/*@author:filipe - coauthor: Letônio*/

export function MenuAdm() {
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
        <div class="container-content-page flex-row-between">
            <aside class="sidebar-menu-adm flex-col-between">
                <figure class="flex-col-center">
                    <img id="profile-adm-icon" src="../assets/icons/menu-casa.png" alt="profile icon">
                </figure>
                <ul class="sidebar-options-adm">
                </ul>
            </aside>
           
        </div>
    
    </main>
    <footer></footer>
	`;

    return div;
}

/*@author:Filipe - coauthor: Letônio*/

export function redirectToMenuAdmPage() {
    const eventStateChange = CriaEventStateChange("/adm/a1");
    window.dispatchEvent(eventStateChange);
}

export function insertMenuItems(){
    const div = document.querySelector(".sidebar-options-adm");
    div.innerHTML = "";
    if (document.cookie.indexOf("session=") !== -1) {
        div.innerHTML = `
            <li id="gods-page"><img src="../assets/icons/icons8-thor.svg" alt="">Deuses</li>
            <li id="categories-page"><img src="../assets/icons/categories.svg" alt="">Categorias</li>
            <li id="edit-profile"><img src="../assets/icons/edit-profile-v1-white.svg" alt="">Adicionar Administrador</li>
            <li id="change-password"><img src="../assets/icons/padlock-v2-white.svg" alt="">Mudar senha</li>
            <li id="edit-categories"><img src="../assets/icons/cards-bold-v1-white.svg" alt="">Editar Categorias</li>
            <li id="edit-gods"><img src="../assets/icons/icons8-thor.svg" alt="">Editar deuses</li>
            <li id="logout"><img src="../assets/icons/logout-white.svg" alt="">Sair</li>`
    }else{
        div.innerHTML = `
        <li id="gods-page"><img src="../assets/icons/icons8-thor.svg" alt="">Deuses</li>
        <li id="categories-page"><img src="../assets/icons/categories.svg" alt="">Categorias</li>`
    }
}

