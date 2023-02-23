import CriaEventStateChange from "./event-url.js";

/*@author:filipe - coauthor: Letônio*/

export function MenuAdm() {
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
        <div class="container-content-page flex-row-between">
            <aside class="sidebar-menu-adm flex-col-between">
                <figure class="flex-col-center">
                    <img id="profile-adm-icon" src="../assets/icons/profile.svg" alt="profile icon">
                    <h2 id="adm-name">Administrador</h2>
                </figure>
                <ul class="sidebar-options">
                    <li id="edit-profile"><img src="../assets/icons/edit-profile-v1-white.svg" alt="">Editar perfil</li>
                    <li id="change-password"><img src="../assets/icons/padlock-v2-white.svg" alt="">Mudar senha</li>
                    <li id="edit-categories"><img src="../assets/icons/cards-bold-v1-white.svg" alt="">Editar Categorias</li>
                    <li id="edit-gods"><img src="../assets/icons/icons8-thor.svg" alt="">Editar deuses</li>
                    <li id="logout"><img src="../assets/icons/logout-white.svg" alt="">Sair</li>

                </ul>
            </aside>
           
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
