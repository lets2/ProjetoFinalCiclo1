import CriaEventStateChange from "./event-url.js";
//import { addExternalResourcesTo, addEventsToPrincipal } from "../index.js";
import { addUniqueEventListener } from "../utils/event-listener.js";

/*@autor:letonio - Tentando criar o primeiro SPA*/

export function Categories() {
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
<main class="main">
	<div class="container-carousel-category">
		<div class="flex-row-between">
			<div class="container-arrow">
				<img class="category-arrow category-arrow-left" src="../assets/icons/arrow-left-white.svg" alt="">
			</div>
			<div class="container-temples">
				<img class="temple" id="temple"src="../assets/uploads/templo_natureza.jpg" alt="">
				<h1 class="temple-legend"></h1>
			</div>
			<div class="container-arrow">
				<img class="category-arrow category-arrow-right" src="../assets/icons/arrow-right-white.svg" alt="">
			</div>
		</div>
		<div class="container-circles flex-row-between">
		</div>
	</div>
	

</main>
<footer></footer>
	`;

    return div;
}
/******************************************
All redirect functions were add to below
*****************************************/

/*@author:Letônio*/
export function redirectToCategoryChoosed(id) {
    const eventStateChange = CriaEventStateChange("/categories/:id", {
        id: id,
    });
    window.dispatchEvent(eventStateChange);
}
/*@author: Letônio*/
export function redirectToLoginAdmPage() {
    const eventStateChange = CriaEventStateChange("/login");
    window.dispatchEvent(eventStateChange);
}
/*@author: Letônio*/
export function redirectToLogoutPage() {
    const eventStateChange = CriaEventStateChange("/login", {
        releaseCookie: true,
    });
    window.dispatchEvent(eventStateChange);
}

/*@author:Filipe - coauthor: Letônio*/
export function redirectToGodDetailsPage(godId) {
    const eventStateChange = CriaEventStateChange("/categories/d1", {
        godId: godId,
    });
    window.dispatchEvent(eventStateChange);
}
/*@author:Filipe - coauthor: Letônio*/
export function redirectToMenuAdmPage() {
    const eventStateChange = CriaEventStateChange("/adm/a1");
    window.dispatchEvent(eventStateChange);
}
/*@author:Filipe - coauthor: Letônio*/
export function redirectToTableEditCategories() {
    const eventStateChange = CriaEventStateChange("/tableCategories");
    window.dispatchEvent(eventStateChange);
}
/*@author:Filipe - coauthor: Letônio*/
export function redirectToTableEditGods() {
    const eventStateChange = CriaEventStateChange("/tableGods");
    window.dispatchEvent(eventStateChange);
}
/*@author:Gabriela - coauthor: Letônio*/
export function redirectToAddGodPage() {
    const eventStateChange = CriaEventStateChange("/addGod");
    window.dispatchEvent(eventStateChange);
}
/*@author:Gabriela - coauthor: Letônio*/
export function redirectToGodInfoPage(godId) {
    const eventStateChange = CriaEventStateChange("/godInfo/g1", {
        godId: godId,
    });
    window.dispatchEvent(eventStateChange);
}
/*@author:Gabriela - coauthor: Letônio*/
export function redirectToEditGodPage(godId) {
    const eventStateChange = CriaEventStateChange("/editGod/g1", {
        godId: godId,
    });
    window.dispatchEvent(eventStateChange);
}
/*@author:Gabriela - coauthor: Letônio*/
export function redirectToMenu() {
    const eventStateChange = CriaEventStateChange("/menu");
    window.dispatchEvent(eventStateChange);
}
/*@author:Gabriela - coauthor: Letônio*/
export function redirectToAddCategory() {
    const eventStateChange = CriaEventStateChange("/addCategory");
    window.dispatchEvent(eventStateChange);
}
/*@author:Gabriela - coauthor: Letônio*/
export function redirectToEditCategory(id) {
    const eventStateChange = CriaEventStateChange("/editCategory", { id: id });
    window.dispatchEvent(eventStateChange);
}

/*@author:Gabriela - coauthor: Letônio*/
export function redirectToGodsFiltered(arrayResults) {
    const eventStateChange = CriaEventStateChange("/godsFiltered", {
        arrayResults: arrayResults,
    });
    window.dispatchEvent(eventStateChange);
}

/*@author:Gabriela - coauthor: Letônio*/
export function redirectToAllGods(parametroDePesquisa) {
    const eventStateChange = CriaEventStateChange("/allGods", {
        parametroDePesquisa: parametroDePesquisa,
    });
    window.dispatchEvent(eventStateChange);
}
/*@author:Gabriela - coauthor: Letônio*/
export function redirectToRegisterUser(parametroDePesquisa) {
    const eventStateChange = CriaEventStateChange("/registerUser");
    window.dispatchEvent(eventStateChange);
}
