import CriaEventStateChange from "./event-url.js";

/*@author:filipe - coauthor: Letônio*/

export function TableCategories() {
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
        <div class="container-content flex-col-center">
               
            <button id="create-new-category">Criar categoria</button>

            <div class="container-table" id= "div-table-categories">
                <table id="table-categories">
                    <thead>
                        <tr>
                            <th>CATEGORIA</th>
                            <th>EDITAR</th>
                            <th>APAGAR</th>
                        </tr>
                    </thead>
                    <tbody id="thead-categories">
                        
                    </tbody>
                </table>
            </div>
          
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
