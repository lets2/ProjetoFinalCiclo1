//-------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------

import { getExternalResourcesTo } from "./api/routerFetch.js";
import { addUniqueEventListener } from "./utils/event-listener.js";

import {
    redirectToAllCategories,
    insertImages,
    insertCategoryName,
    addEventsToCategorySelected,
} from "./pages/cards_god_from_categ.js";

import {
    redirectToLoginAdmPage,
    redirectToLogoutPage,
} from "./pages/login-page.js";

import { redirectToMenuAdmPage } from "./pages/adm_perfil_sidebar.js";

import {
    redirectToTableEditCategories,
    addLinesCategoryTable,
    addEventsToCategoryTablePage,
} from "./pages/table_categories.js";

import {
    redirectToTableEditGods,
    addLinesGodTable,
    addEventsToGodTablePage,
} from "./pages/table_gods.js";

import {
    insertChoosedGodImg,
    addEventsToAddNewGodPage,
    clearInputFromFormAddGod,
} from "./pages/add-god.js";

import {
    addElementsToGodInfoPage,
    addEventsToAdmGodInfoPage,
} from "./pages/adm-god-info.js";

import {
    inserirElementosNaEditGodPage,
    addSelectWithCategoriesInGodsPage,
    addEventsToEditGodPages,
} from "./pages/edit-god.js";

import { redirectToMenu } from "./pages/menu.js";

import {
    addEventsToAddCategoryPage,
    clearInputFromFormAddCategory,
} from "./pages/add-category.js";

import {
    insertChoosedCategoryTempleImg,
    testInserirElementosNaEditCategoryPage,
    addEventsToEditCategoryPage,
} from "./pages/edit-cat.js";

import {
    redirectToAllGods,
    insertAllGods,
    addEventsToAllGodsPage,
    insertMessageNoGodFound,
} from "./pages/all-gods-page.js";

import {
    renderCurrentCategoryOnCategoriesPage,
    addEventsToCategoriesPage,
    redirectToRegisterUser,
} from "./pages/all-categories-page.js";

import GeraObjComRotas from "./pages/router.js";
import {
    redirectToEditPasswd,
    addEventsToEditPasswd,
} from "./pages/edit-passwd.js";

//-------------------------------------------------------------
// GLOBAL VARIABLES
//--------------------------------------------------------------

let categoriesList = [];
let godsOfACategory = [];
let allGodsArray = [];
let godsFilteredArrayGlobal = [];

// Exported global variables
export { categoriesList };
export { godsOfACategory };
export { allGodsArray };

//------------------------------------------------------------------------
// RENDER INITIAL - LANDING PAGE
//------------------------------------------------------------------------

const root = document.querySelector("#root");
const objRotas = GeraObjComRotas();
const page = objRotas.getPage("/");

root.innerHTML = "";
root.appendChild(page);

getExternalResourcesTo("/");
addEventsRelatedTo("/"); //call relateds events to page/url

//------------------------------------------------------------------------
// LISTENER TO HEAR WHEN ONSTATECHANGE CUSTOM EVENT IS DISPATCH
//-----------------------------------------------------------------------

addUniqueEventListener(window, "onstatechange", async (event) => {
    const url = event.detail.url;
    const criteria = event.detail.criteria;

    const page = objRotas.getPage(url);
    history.pushState({}, "", url);
    root.innerHTML = "";
    root.appendChild(page);

    const respostaIndex = await getExternalResourcesTo(url, criteria);
    insertResourcesInCurrentPage(url, respostaIndex, criteria);

    clearSearchBar();
    addEventsRelatedTo(url);
});

function insertResourcesInCurrentPage(url, respostaIndex, criteria) {
    switch (url) {
        case "/categories":
            categoriesList = respostaIndex;
            renderCurrentCategoryOnCategoriesPage(categoriesList);
            break;

        case "/categories/:id":
            godsOfACategory = respostaIndex;
            insertImages(godsOfACategory);
            if (godsOfACategory) {
                insertCategoryName(godsOfACategory[0].name_category);
            } else {
                insertCategoryName("Essa categoria não possui deuses ainda!");
            }
            break;

        case "/categories/d1":
            RenderButtonBack(criteria.categoryId);
            break;

        case "/tableCategories":
            categoriesList = respostaIndex;
            addLinesCategoryTable(categoriesList);
            break;

        case "/tableGods":
            categoriesList = respostaIndex.dataCategories;
            addLinesGodTable(respostaIndex.dataGods);
            break;

        case "/godInfo/g1":
            addElementsToGodInfoPage(respostaIndex);
            break;

        case "/editGod/g1":
            // insertChoosedGodImg(false);
            inserirElementosNaEditGodPage(respostaIndex);
            insertChoosedGodImg(false);
            addSelectWithCategoriesInGodsPage(respostaIndex.category_id);

            break;

        case "/editCategory":
            testInserirElementosNaEditCategoryPage(respostaIndex);
            insertChoosedCategoryTempleImg(false); //function to show preview
            break;

        case "/addCategory":
            clearInputFromFormAddCategory();
            insertChoosedCategoryTempleImg(true); //function to show preview
            break;

        case "/addGod":
            clearInputFromFormAddGod();
            insertChoosedGodImg(true);
            addSelectWithCategoriesInGodsPage();
            break;
        case "/allGods":
            if (Array.isArray(respostaIndex)) {
                godsFilteredArrayGlobal = respostaIndex;
                allGodsArray = respostaIndex;

                insertAllGods(godsFilteredArrayGlobal, {
                    message: `Resultados correspondentes à sua pesquisa: ${godsFilteredArrayGlobal.length}`,
                    pesquisou: true,
                });
            } else {
                if (criteria.pesquisar) {
                    allGodsArray = respostaIndex.dataGods;

                    insertAllGods(allGodsArray, {
                        message:
                            "Não há deuses correspondentes à sua pesquisa. Aqui está uma lista com todos os deuses",
                        pesquisou: true,
                    });
                } else {
                    allGodsArray = respostaIndex.dataGods;
                    insertAllGods(allGodsArray, { pesquisou: false });
                }
            }

            break;
    }
}

//------------------------------------------------------------------------
// ADDS EVENTS TO THE PAGE THAT WAS RENDERED ACCORDING URL
//-----------------------------------------------------------------------
import { currentIndexCategory } from "./pages/all-categories-page.js";
import { RenderButtonBack } from "./utils/btn-back-cards.js";
function addEventsRelatedTo(url) {
    switch (url) {
        case "/":
            addEventsToMainPageTest();
            break;
        case "/categories":
            addEventsToCategoriesPage();
            break;
        case "/categories/:id":
            addEventsToCategorySelected();
            break;
        case "/login":
            addEventsToAdmLoginPage();
            break;
        case "/categories/d1":
            addEventsToGodDetailsPage();
            break;
        case "/adm/a1":
            addEventsToAdmMenuPage();
            break;
        case "/tableCategories":
            addEventsToCategoryTablePage();
            break;
        case "/tableGods":
            addEventsToGodTablePage();
            break;
        case "/addGod":
            addEventsToAddNewGodPage();
            break;
        case "/godInfo/g1":
            addEventsToAdmGodInfoPage();
            break;
        case "/editGod/g1":
            addEventsToEditGodPages();
            break;
        case "/menu":
            addEventsToMenuPage();
            break;
        case "/addCategory":
            addEventsToAddCategoryPage();
            break;
        case "/editCategory":
            addEventsToEditCategoryPage();
            break;
        case "/allGods":
            addEventsToAllGodsPage();
            break;
        case "/registerUser":
            addEventsToRegisterUser();
            break;
        case "/editPassword":
            addEventsToEditPasswd();
            break;
    }
}

/*@author:letonio*/
function addEventsToMainPageTest() {
    addEventsToHeader();
    const seeMoreButton = document.querySelector(".button-see-more");
    addUniqueEventListener(seeMoreButton, "click", () => {
        redirectToAllCategories();
    });
}

/*events related to the adm login page*/
function addEventsToAdmLoginPage() {
    addEventsToHeader();
    adicionaEventoNoBotaoDeLogin();
}

function adicionaEventoNoBotaoDeLogin() {
    const buttonLogin = document.querySelector("#login-logo-button");
    addUniqueEventListener(buttonLogin, "click", async () => {
        try {
            const username = document.querySelector("#input-username").value;
            const password = document.querySelector("#input-password").value;
            await tryingLogin(username, password);
            redirectToMenuAdmPage();
        } catch (error) {
            displayWarning(error);
        }
    });
}

async function tryingLogin(_username, _password) {
    const objBody = {
        name: _username,
        password: _password,
    };
    const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(objBody),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (response.status !== 200 && response.status !== 201) {
        throw "Nome de usuário ou senha inválidos!";
    }
    const jsonData = await response.json();
}

/*@author:filipe - coauthor: Letônio*/
/*events related to the Gods description page*/
function addEventsToGodDetailsPage() {
    addEventsToHeader();
}

import { insertMenuItems } from "./pages/adm_perfil_sidebar.js";
/*@author:filipe - coauthor: Letônio*/
/*Events added to the administrator menu*/
function addEventsToAdmMenuPage() {
    addEventsToHeader();
    insertMenuItems();

    const objMenu = [
        { label: "#gods-page", handle: redirectToAllGods },
        { label: "#categories-page", handle: redirectToAllCategories },
    ];

    const objMenuAdm = [
        { label: "#gods-page", handle: redirectToAllGods },
        { label: "#categories-page", handle: redirectToAllCategories },
        { label: "#edit-profile", handle: redirectToRegisterUser },
        { label: "#change-password", handle: redirectToEditPasswd },
        { label: "#edit-categories", handle: redirectToTableEditCategories },
        { label: "#edit-gods", handle: redirectToTableEditGods },
        //{ label: "#logout", handle: redirectToLoginAdmPage },//vou modificar o redirect
        { label: "#logout", handle: redirectToLogoutPage },
    ];
    if (document.cookie.indexOf("session=") !== -1) {
        objMenuAdm.forEach((element) => {
            const menuAdmOption = document.querySelector(element.label);

            addUniqueEventListener(menuAdmOption, "click", () => {
                element.handle();
            });
        });
    } else {
        objMenu.forEach((element) => {
            const menuOption = document.querySelector(element.label);

            addUniqueEventListener(menuOption, "click", () => {
                element.handle();
            });
        });
    }
}

/*@author:Gabriela - coauthor: Letônio*/
// Add events to menu page
function addEventsToMenuPage() {
    addEventsToHeader();
    const pageIcon = document.querySelector("#home-page");
    addUniqueEventListener(pageIcon, "click", () => {
        redirectToAllCategories();
    });

    const godIcon = document.querySelector("#gods-page");
    addUniqueEventListener(godIcon, "click", () => {
        redirectToAllGods("Allgods");
    });

    const categoriesIcon = document.querySelector("#categories-page");
    addUniqueEventListener(categoriesIcon, "click", () => {
        redirectToAllCategories();
    });
}

export function displayWarning(_message) {
    const bodyTag = document.querySelector("body");
    const createTag = document.createElement("div");
    bodyTag.appendChild(createTag);
    createTag.classList.add("table-modal");

    const message = document.createElement("p");
    message.classList.add("modal");
    message.innerHTML = _message;

    createTag.appendChild(message);

    setTimeout(function () {
        document.querySelector(".modal").classList.add("show");
    }, 10);

    addUniqueEventListener(createTag, "click", () => {
        createTag.remove();
    });
}

/*********************************************/
/*events that are added to EVERY HEADER
/*********************************************/

let timeoutId;

export function addEventsToHeader() {
    const logo = document.querySelector("#logo");

    addUniqueEventListener(logo, "click", () => {
        redirectToAllCategories();
    });

    /*Add event to PROFILE ICON, redirect to Login Adm Page*/
    const profileIcon = document.querySelector("#profile-icon");

    addUniqueEventListener(profileIcon, "click", () => {
        if (document.cookie.indexOf("session=") !== -1) {
            redirectToMenuAdmPage();
        } else {
            redirectToLoginAdmPage();
        }
    });

    const menuIcon = document.querySelector("#menu-icon");

    addUniqueEventListener(menuIcon, "click", () => {
        redirectToMenuAdmPage();
    });

    const inputSearchBar = document.querySelector(".search-input");
    addUniqueEventListener(inputSearchBar, "keyup", (event) => {
        debouncePesquisar(event.target.value);
    });
}

function debouncePesquisar(texto) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        pesquisar(texto);
    }, 800);
}

async function pesquisar(texto) {
    const arrayWords = texto.split(/\s|,/);
    const parametro = arrayWords.join(",");

    redirectToAllGods(parametro, true);
}
// author: Gabriela
function addEventsToRegisterUser() {
    addEventsToHeader();

    const cancelButton = document.querySelector(".cancel-button-register");
    addUniqueEventListener(cancelButton, "click", () => {
        redirectToMenuAdmPage();
    });

    const registerBtn = document.querySelector("#add-user-button");
    addUniqueEventListener(registerBtn, "click", async (e) => {
        e.preventDefault();
        try {
            const username = document.querySelector("#new-name-user").value;
            const email = document.querySelector("#new-email-user").value;
            const password = document.querySelector("#new-passwd-user").value;
            const success = await tryRegisterUser(username, email, password);

            if (success) {
                redirectToMenuAdmPage();
            }
        } catch (error) {
            displayWarning(error);
        }
    });
}

async function tryRegisterUser(_username, _email, _password) {
    const objBody = {
        username: _username,
        password: _password,
        email: _email,
    };

    try {
        const response = await fetch("/registerAdm", {
            method: "POST",
            body: JSON.stringify(objBody),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.status !== 200 && response.status !== 201) {
            const obj = await response.json();
            throw obj.message;
        }
        const jsonData = await response.json();

        displayWarning("Cadastrado com sucesso!");
        return true;
    } catch (error) {
        displayWarning(error);
        return false;
    }
}

function clearSearchBar() {
    const inputSearchBar = document.querySelector(".search-input");
    inputSearchBar.value = "";
}
