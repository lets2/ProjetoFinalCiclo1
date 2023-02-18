import CriaEventStateChange from "./event-url.js";
//import { addExternalResourcesTo, addEventsToPrincipal } from "../index.js";

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
<main>
	<div class="container-carousel flex-col-center">
		<div class="carousel flex-row-between">
			<div class="container-arrow flex-center-center">
				<img class="category-arrow category-arrow-left" src="../assets/icons/arrow-left-white.svg" alt="">
			</div>
			<figure class="container-temples">
				<img class="temple" id="temple"src="../assets/images/temples/templo_natureza.jpg" alt="">
				<h1 class="temple-legend">Deuses da Natureza</h1>
			</figure>
			<div class="container-arrow flex-center-center">
				<img class="category-arrow category-arrow-right" src="../assets/icons/arrow-right-white.svg" alt="">
			</div>
			
		</div>
		<div class="container-circles flex-row-between">
			<button class="circle"></button>
			<button class="circle"></button>
			<button class="circle circle-orange"></button>
			<button class="circle"></button>
			<button class="circle"></button>
		</di>
	</div>
	

</main>
<footer></footer>
	`;

    document.addEventListener("DOMContentLoaded", () => {
        console.log("entrou no evento externo da main");
        //addExternalResourcesTo("/");
        //addEventsToPrincipal();
        //addExternalResourcesTo("/categories");
        //addEventsRelatedTo("/categories");
    });

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
/*@author:Filipe - coauthor: Letônio*/
export function redirectToGodDetailsPage() {
    const eventStateChange = CriaEventStateChange("/categories/d1");
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
export function redirectToGodInfoPage(id) {
    const eventStateChange = CriaEventStateChange("/godInfo/g1");
    window.dispatchEvent(eventStateChange);
}
/*@author:Gabriela - coauthor: Letônio*/
export function redirectToEditGodPage() {
    const eventStateChange = CriaEventStateChange("/editGod/g1");
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
export function redirectToEditCategory() {
    const eventStateChange = CriaEventStateChange("/editCategory");
    window.dispatchEvent(eventStateChange);
}
