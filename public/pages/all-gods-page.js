import CriaEventStateChange from "./event-url.js";

/*@autor:Gabriela */

export function AllGodsPage() {
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
	<main class="main-all-gods">
		<div class="container-all-gods-page flex-center-center">
            <div id="box-all-gods">
                <div id="box-all-gods-overflow">
                                    
                </div>
            </div>
		</div>
	</main>
	<footer></footer>
	`;

    return div;
}

/*@author:Gabriela - coauthor: Letônio*/
export function redirectToAllGods(parametroDePesquisa, pesquisar = false) {
    const eventStateChange = CriaEventStateChange("/allGods", {
        parametroDePesquisa: parametroDePesquisa,
        pesquisar: pesquisar,
    });
    window.dispatchEvent(eventStateChange);
}

//FUnção que adiciona todos os deuses ou os deuses filtrados da abrra de pesquisa
//dependendo do if/else que existe no index.js

export function insertAllGods(allGodsArray) {
    const cardsGods = document.querySelector("#box-all-gods-overflow");
    let div = "";
    cardsGods.innerHTML = "";
    if (allGodsArray) {
        for (let i = 0; i < allGodsArray.length; i++) {
            div = `<div class="flex-center-center">
                <img class="cards-gods" id = "god-id-${allGodsArray[i].id}" data-god-id=${allGodsArray[i].id} src = "../assets/uploads/${allGodsArray[i].src_img}"  alt="Cartão 2">
            </div>
            `;
            cardsGods.innerHTML += div;
        }
    }
}

//Caso durante a pesquisa não tenha nenhum deus, escreve mensagem de nenhum deus encontrado
//e sugestoes de alguns deuses:
export function insertMessageNoGodFound() {
    //const cardsGods = document.querySelector("#box-all-gods-overflow");
    const cardsGods = document.querySelector("#box-all-gods");
    cardsGods.innerHTML = "";
    cardsGods.innerHTML = `<h4>Não há deuses correspondentes à sua pesquisa.</h4>`;
}

//eventos de click presentes na pagina que tem todos os deuses
import { addEventsToHeader, allGodsArray } from "../index.js";
import { addUniqueEventListener } from "../utils/event-listener.js";
import { redirectToGodDetailsPage } from "./god-card-details.js";

export function addEventsToAllGodsPage() {
    addEventsToHeader();
    if (allGodsArray) {
        for (let i = 0; i < allGodsArray.length; i++) {
            let godCard = document.querySelector(
                `#god-id-${allGodsArray[i].id}`
            );
            //// console.log(godCard.id, "AAAA");
            addUniqueEventListener(godCard, "click", () => {
                redirectToGodDetailsPage(godCard.dataset.godId);
            });
        }
    }
}
