import CriaEventStateChange from "./event-url.js";

/*@autor:letonio */

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
	<main class="main-cards-gods">
		<div class="container-page-gods">
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

export function insertImages(arrayGods) {
    const cardsGods = document.querySelector("#box-cards-gods-overflow");

    let div = "";
    cardsGods.innerHTML = "";
    if (arrayGods) {
        for (let i = 0; i < arrayGods.length; i++) {
            div = `<div id = "god-${arrayGods[i].id}" data-god-id=${arrayGods[i].id} class="flex-center-center box-card-info-cat">
                        <img class="cards-gods"  src = "../assets/uploads/${arrayGods[i].src_img}"  alt="Cartão 2">
                        <div class="card-hover-cat">
                            <p class="card-hover-name-cat">${arrayGods[i].name}</p>
                            <p class="card-hover-status-cat">${arrayGods[i].status}</p>
                        </div>
                    </div>
            `;
            cardsGods.innerHTML += div;
        }
    }
}

export function insertCategoryName(nameCategory) {
    document.querySelector(".phrase").innerHTML = nameCategory;
}

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

            addUniqueEventListener(godCard, "click", () => {
                redirectToGodDetailsPage(
                    godCard.dataset.godId,
                    godsOfCategory[i].category_id
                );
            });
        }
    }
}
