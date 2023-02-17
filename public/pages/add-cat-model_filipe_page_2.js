import CriaEventStateChange from "./event-url.js";

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

    /*
    document.addEventListener("DOMContentLoaded", () => {
        const logo = document.querySelector("#logo");
        console.log("ENTROU AQUI externo category!!!");
        console.log("existe:", logo);
        logo.addEventListener("click", () => {
            console.log("entrou no interno da categoria!");
            redirectToMyPrincipal();
        });
    });
	*/

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

export function redirectToMyPrincipal() {
    const eventStateChange = CriaEventStateChange("/");
    window.dispatchEvent(eventStateChange);
}
