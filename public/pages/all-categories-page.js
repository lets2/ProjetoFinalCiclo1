import CriaEventStateChange from "./event-url.js";
//import { addExternalResourcesTo, addEventsToPrincipal } from "../index.js";
import { addUniqueEventListener } from "../utils/event-listener.js";

/*@autor:letonio - Tentando criar o primeiro SPA*/
//CONTEUDO SPA DA PAGINA QUE TEM TODAS AS CATEGORIAS
export function Categories() {
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
<main class="main" id="all-category-main">
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
		<div class="container-circles"></div>
	</div>
</main>
<footer></footer>
	`;

    return div;
}

/*@author:Gabriela - coauthor: Letônio*/
export function redirectToGodsFiltered(arrayResults) {
    const eventStateChange = CriaEventStateChange("/godsFiltered", {
        arrayResults: arrayResults,
    });
    window.dispatchEvent(eventStateChange);
}

export let currentIndexCategory;

export function renderCurrentCategoryOnCategoriesPage(categories) {
    let index;
    const quantify = categories.length;
    if (quantify % 2) {
        index = Math.floor(quantify / 2);
    } else Math.floor(quantify / 2) - 1;
    index = 2; //@author:letonio !!
    currentIndexCategory = 2;
    renderImgCategory(
        currentIndexCategory,
        quantify,
        categories[currentIndexCategory].id,
        categories[currentIndexCategory].name,
        categories[currentIndexCategory].src
    );

    renderBallsBelowImg(currentIndexCategory, quantify);
}

function renderBallsBelowImg(index, quantify) {
    //create balls-based on index-position-image
    const containerCircles = document.querySelector(".container-circles");
    containerCircles.innerHTML = "";
    for (let i = 0; i < quantify; i++) {
        const circle = document.createElement("button");
        circle.classList.add("circle");
        if (i === index) {
            circle.classList.add("circle-orange");
        }
        containerCircles.appendChild(circle);
    }
}

/*Events related to the categories page < [] >  */
import { categoriesList, addEventsToHeader } from "../index.js";
import { redirectToCategoryChoosed } from "./cards_god_from_categ.js";

export function addEventsToCategoriesPage() {
    //Add event to the current temple displayed on Page
    const containerTemples = document.querySelector(".container-temples");
    addUniqueEventListener(containerTemples, "click", () => {
        redirectToCategoryChoosed(categoriesList[currentIndexCategory].id);
    });

    //change arrow color on hover
    const arrowLeft = document.querySelector(".category-arrow-left");

    addUniqueEventListener(arrowLeft, "mouseenter", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-left-orange.svg"
        );
    });
    addUniqueEventListener(arrowLeft, "mouseout", (event) => {
        event.target.setAttribute("src", "./assets/icons/arrow-left-white.svg");
    });

    addUniqueEventListener(arrowLeft, "click", () => {
        const templeImage = document.querySelector("#temple");

        if (currentIndexCategory > 0) {
            currentIndexCategory = currentIndexCategory - 1;
            updateTempleContent(currentIndexCategory);
        }
    });

    const arrowRight = document.querySelector(".category-arrow-right");

    addUniqueEventListener(arrowRight, "mouseover", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-right-orange.svg"
        );
    });
    addUniqueEventListener(arrowRight, "mouseout", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-right-white.svg"
        );
    });

    addUniqueEventListener(arrowRight, "click", () => {
        const templeImage = document.querySelector("#temple");
        if (currentIndexCategory < categoriesList.length - 1) {
            //
            currentIndexCategory = currentIndexCategory + 1;
            //
            updateTempleContent(currentIndexCategory);
        }
    });

    addEventsToHeader();
}

function updateTempleContent(newIndex) {
    const quantify = categoriesList.length;
    renderImgCategory(
        newIndex,
        quantify,
        categoriesList[newIndex].id,
        categoriesList[newIndex].name,
        categoriesList[newIndex].src
    );

    renderBallsBelowImg(newIndex, quantify);
}

function renderImgCategory(
    categoryIndex,
    categoryQuantify,
    categoryId,
    categoryName,
    categorySrc
) {
    const imagem = document.querySelector("#temple");
    const categoryTitle = document.querySelector(".temple-legend");
    imagem.setAttribute("src", `./assets/uploads/${categorySrc}`);
    categoryTitle.innerText = categoryName;
}

/*@author:Gabriela - coauthor: Letônio*/
export function redirectToRegisterUser(parametroDePesquisa) {
    const eventStateChange = CriaEventStateChange("/registerUser");
    window.dispatchEvent(eventStateChange);
}
