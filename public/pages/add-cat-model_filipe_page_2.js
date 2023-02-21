import CriaEventStateChange from "./event-url.js";

/*@author:Gabriela - coauthor: Letônio*/

export function AddCategory() {
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
        <div class="container-carousel flex-center-center">

            <div class="retangulo">
            </div>

            <div class="p2-background flex-col-justify-center"> 

                <div class="nome-categoria cor-categoria flex-col-center">

                    <input type="text" placeholder="Nome da categoria">
                    <input type="text" placeholder="Cor da categoria">

                </div>

                <div class="button-cancelar button-adicionar flex-row-between">

                    <button id="Cancelar" type="submit">Cancelar</button>
                    <button id="Adicionar" type="submit">Adicionar</button>

                </div>
            </div>
        </div>
    </main>
    <footer></footer>
	`;

    return div;
}

/*--------------------------------------------*/

export function redirectToMyPrincipal() {
    const eventStateChange = CriaEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}
