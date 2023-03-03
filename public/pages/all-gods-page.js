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
		<div class="container-all-gods-page flex-col-center">
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

export function insertAllGods(
    allGodsArray,
    obj = { message: "", pesquisou: false }
) {
    const containerPage = document.querySelector(".container-all-gods-page");

    const previousMessageArray = document.querySelectorAll(
        ".text-warning-result-search"
    );
    if (previousMessageArray.length > 0) {
        previousMessageArray.forEach((element) => element.remove());
    }

    if (obj.pesquisou) {
        const h4Tag = document.createElement("h4");
        h4Tag.innerHTML = obj.message;
        h4Tag.classList.add("text-warning-result-search");
        containerPage.insertBefore(h4Tag, containerPage.firstChild);
    }

    const cardsGods = document.querySelector("#box-all-gods-overflow");
    let div = "";
    cardsGods.innerHTML = "";
    if (allGodsArray) {
        for (let i = 0; i < allGodsArray.length; i++) {
            div = `<div id = "god-id-${allGodsArray[i].id}" data-god-id=${allGodsArray[i].id} class="flex-center-center box-card-info">
                        <img class="cards-gods"  src = "../assets/uploads/${allGodsArray[i].src_img}"  alt="Cartão 2">
                        <div class="card-hover">
                            <p class="card-hover-name">${allGodsArray[i].name}</p>
                            <p class="card-hover-status">${allGodsArray[i].status}</p>
                        </div>
                    </div>
            `;
            cardsGods.innerHTML += div;
        }
    }
}

export function insertMessageNoGodFound() {
    const cardsGods = document.querySelector("#box-all-gods");
    cardsGods.innerHTML = "";
    cardsGods.innerHTML = `<h4>Não há deuses correspondentes à sua pesquisa.</h4>`;
}

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

            addUniqueEventListener(godCard, "click", () => {
                redirectToGodDetailsPage(godCard.dataset.godId, -1); //-1 botão de voltar leva para todos os deuses
            });
        }
    }
}
