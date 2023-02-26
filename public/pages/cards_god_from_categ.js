import CriaEventStateChange from "./event-url.js";

/*@autor:letonio - Tentando criar o primeiro SPA*/

export function Category() {
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
		<div class="container-page-gods flex-row-between">
            <div id="box-cards-gods">
                <div id="box-cards-gods-overflow">
                                    
                </div>
            </div>
            <div  class="phrase">
                <h2><span>Deuses da Natureza</span></h2>
            </div>
		</div>
	</main>
	<footer></footer>
	`;

    return div;
}

export function redirectToAllCategories() {
    const eventStateChange = CriaEventStateChange("/categories");
    window.dispatchEvent(eventStateChange);
}

/*@author:Letônio*/

export function redirectToCategoryChoosed(id) {
    const eventStateChange = CriaEventStateChange("/categories/:id", {
        id: id,
    });
    window.dispatchEvent(eventStateChange);
}

//ADICIONA IMAGENS NA PAGINA QUE FICA OS CARTOES

export function insertImages(arrayGods) {
    const cardsGods = document.querySelector("#box-cards-gods-overflow");
    let div = "";
    cardsGods.innerHTML = "";
    if (arrayGods) {
        for (let i = 0; i < arrayGods.length; i++) {
            div = `<div class="flex-center-center">
                <img class="cards-gods" id = "god-${arrayGods[i].id}" data-god-id=${arrayGods[i].id} src = "../assets/uploads/${arrayGods[i].src_img}"  alt="Cartão 2">
            </div>
            `;
            cardsGods.innerHTML += div;
        }
    }
}

// INSERE NOME DA CATEGORIA OU EXPLICA QUE A CATEGORIA NAO TEM DEUSES AINDA:
export function insertCategoryName(nameCategory) {
    document.querySelector(".phrase").innerHTML = nameCategory;
}

//ADICIONANDO EVENTOS RELACIONADO A ESSA PAGINA QUE MOSTRA OS CARTOES:
import { addEventsToHeader, godsOfACategory } from "../index.js";
import { redirectToGodDetailsPage } from "./god-card-details.js";
import { addUniqueEventListener } from "../utils/event-listener.js";

export function addEventsToCategorySelected() {
    addEventsToHeader();
    eventosAdicionadosEmCadaCartao(godsOfACategory);
}

/*events added on the home page card of the chosen category*/

function eventosAdicionadosEmCadaCartao(godsOfCategory) {
    if (godsOfCategory) {
        for (let i = 0; i < godsOfCategory.length; i++) {
            let godCard = document.querySelector(
                `#god-${godsOfCategory[i].id}`
            );
            ////console.log(godCard.id, "AAAA");
            addUniqueEventListener(godCard, "click", () => {
                redirectToGodDetailsPage(godCard.dataset.godId);
            });
        }
    }
}
