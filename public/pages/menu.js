import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/

export function Menu() {
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
        <!-- @author: Letônio, co-author: Gabriela -- só troquei os ícones e o texto do menu --> 
        <div class="container-content-page flex-row-between">
            <aside class="sidebar-menu-adm flex-col-between">
                <figure class="flex-col-center" id="box-menu">
                    <h2 id="adm-name">Menu</h2>
                </figure>
                <ul class="sidebar-options">
                    <li id="home-page"><img src="../assets/icons/home.svg" alt="">Página Principal</li>
                    <li id="gods-page"><img src="../assets/icons/icons8-thor.svg" alt="">Deuses</li>
                    <li id="categories-page"><img src="../assets/icons/categories.svg" alt="">Categorias</li>
                    <li id="about-page"><img src="../assets/icons/about.svg" alt="">Sobre</li>
                </ul>
            </aside>
           
        </div>
        

    </main>
    <footer></footer>
	`;
    return div;
}

/*@author:Gabriela - coauthor: Letônio*/

export function redirectToMenu() {
    const eventStateChange = CriaEventStateChange("/menu");
    window.dispatchEvent(eventStateChange);
}
