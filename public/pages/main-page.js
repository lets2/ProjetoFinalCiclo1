import CriaEventStateChange from "./event-url.js";
import { addExternalResourcesTo, addEventsToPrincipal } from "../index.js";
const objPages = [
    { label: "Brigadeiros", handle: redirectToBrigadeiros },
    { label: "Cupcakes", handle: redirectToCupcakes },
    { label: "Doces", handle: redirectToDoces },
];
/*
export default function Principal() {
	const div = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.textContent = "Alpha Doceria";
	div.appendChild(h1);

	objPages.forEach((element) => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = element.label;
		btn.onclick = element.handle; //btn.onclick = redirectToAnotherPage;
		div.appendChild(btn);
	});

	return div;
}
*/

/*@autor:letonio - Tentando criar o primeiro SPA*/

export function Principal() {
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
				<h1 class="temple-legend">Deuses da natureza</h1>
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
        addExternalResourcesTo("/");
        addEventsToPrincipal();
    });

    /*

	const div = document.createElement("div");
	const h1 = document.createElement("h1");

	h1.textContent = "Alpha Doceria";
	div.appendChild(h1);

	objPages.forEach((element) => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = element.label;
		btn.onclick = element.handle; //btn.onclick = redirectToAnotherPage;
		div.appendChild(btn);
	});
*/
    return div;
}

/* function redirectToAnotherPage(event) {
	const path = "/" + event.target.textContent.toLowerCase();
	const eventStateChange = CriaEventStateChange(path);
	window.dispatchEvent(eventStateChange);
} */

/*--------------------------------------------*/
function redirectToBrigadeiros() {
    const eventStateChange = CriaEventStateChange("/brigadeiros");
    window.dispatchEvent(eventStateChange);
}

function redirectToCupcakes() {
    const eventStateChange = CriaEventStateChange("/cupcakes");
    window.dispatchEvent(eventStateChange);
}

function redirectToDoces() {
    const eventStateChange = CriaEventStateChange("/doces");
    window.dispatchEvent(eventStateChange);
}

export function redirectToCategoryChoosed(index) {
    const eventStateChange = CriaEventStateChange("/category", index);
    window.dispatchEvent(eventStateChange);
}

export function redirectToLoginAdmPage() {
    const eventStateChange = CriaEventStateChange("/login");
    window.dispatchEvent(eventStateChange);
}

export function redirectToGodDetailsPage() {
    const eventStateChange = CriaEventStateChange("/category/d1");
    window.dispatchEvent(eventStateChange);
}

export function redirectToMenuAdmPage() {
    const eventStateChange = CriaEventStateChange("/adm/a1");
    window.dispatchEvent(eventStateChange);
}

export function redirectToTableEditCategories() {
    const eventStateChange = CriaEventStateChange("/tableCategories");
    window.dispatchEvent(eventStateChange);
}

export function redirectToTableEditGods() {
    const eventStateChange = CriaEventStateChange("/tableGods");
    window.dispatchEvent(eventStateChange);
}

export function redirectToAddGodPage() {
    const eventStateChange = CriaEventStateChange("/addGod");
    window.dispatchEvent(eventStateChange);
}

export function redirectToGodInfoPage(id) {
    const eventStateChange = CriaEventStateChange("/godInfo/g1");
    window.dispatchEvent(eventStateChange);
}

export function redirectToEditGodPage() {
    const eventStateChange = CriaEventStateChange("/editGod/g1");
    window.dispatchEvent(eventStateChange);
}
