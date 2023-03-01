//-------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------

import { addExternalResourcesTo } from "./api/routerFetch.js";
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
    // addSelectWithCategories,
    addEventsToGodTablePage,
} from "./pages/table_gods.js";

import {
    insertChoosedGodImg,
    addEventsToAddNewGodPage,
    clearInputFromFormAddGod, //adicionei essa funcao para limpar o formulario da page
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

addExternalResourcesTo("/");
addEventsRelatedTo("/"); //call relateds events to page/url

//------------------------------------------------------------------------
// LISTENER TO HEAR WHEN ONSTATECHANGE CUSTOM EVENT IS DISPATCH
//-----------------------------------------------------------------------

addUniqueEventListener(window, "onstatechange", async (event) => {
    const url = event.detail.url;
    const criteria = event.detail.criteria;
    //o valor padrão de criteria={}, se diferente de null implia q

    const page = objRotas.getPage(url);
    history.pushState({}, "", url);
    root.innerHTML = "";
    root.appendChild(page);
    console.log("URL:", url, "Criteria:", criteria);

    const respostaIndex = await addExternalResourcesTo(url, criteria);

    chamaFuncaoEspecificaPelaUrl(url, respostaIndex, criteria);
    clearSearchBar();
    addEventsRelatedTo(url); //call relateds events to page/url
});

function chamaFuncaoEspecificaPelaUrl(url, respostaIndex, criteria) {
    switch (url) {
        case "/categories":
            categoriesList = respostaIndex; //nesse caso respostaIndex = lista de categorias
            renderCurrentCategoryOnCategoriesPage(categoriesList);
            break;

        case "/categories/:id":
            godsOfACategory = respostaIndex; //nesse caso respostaIndex = lista de deuses de cat. especif.
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
            categoriesList = respostaIndex; //respostaIndex tem a lista de categorias
            addLinesCategoryTable(categoriesList);
            break;

        case "/tableGods":
            categoriesList = respostaIndex.dataCategories;
            // addSelectWithCategories(respostaIndex.dataCategories);
            addLinesGodTable(respostaIndex.dataGods);
            console.log(categoriesList, "categoreis");
            break;

        case "/godInfo/g1":
            addElementsToGodInfoPage(respostaIndex);
            break;

        case "/editGod/g1":
            //console.log("ZZZ CATEGORY ID:", respostaIndex);
            inserirElementosNaEditGodPage(respostaIndex);
            addSelectWithCategoriesInGodsPage(respostaIndex.category_id);
            //a funcao acima eh usada em duas paginas (add e edit),
            //vou colocar um parametro que caso nao seja informado por padrao
            //sera nulo, ai na pagina de edit-god, caso nao seja nulo
            //significa que devo fixar o valor do select
            break;

        case "/editCategory":
            insertChoosedCategoryTempleImg(); //function to show preview
            testInserirElementosNaEditCategoryPage(respostaIndex);
            break;

        case "/addCategory":
            clearInputFromFormAddCategory();
            insertChoosedCategoryTempleImg(); //function to show preview
            break;

        case "/addGod":
            clearInputFromFormAddGod();
            insertChoosedGodImg();
            addSelectWithCategoriesInGodsPage();
            break;
        case "/allGods":
            console.log("zzOLHA O RESPOSTA INDEX:", respostaIndex);
            if (Array.isArray(respostaIndex)) {
                godsFilteredArrayGlobal = respostaIndex;
                allGodsArray = respostaIndex; //ganbiarra, se tirar isso da erro na 1190
                displayWarning(
                    `Resultados correspondentes à sua pesquisa: ${godsFilteredArrayGlobal.length}`
                );
                insertAllGods(godsFilteredArrayGlobal);
            } else {
                if (criteria.pesquisar) {
                    allGodsArray = respostaIndex.dataGods;
                    displayWarning(
                        "Não há deuses correspondentes à sua pesquisa. Aqui está uma lista com todos os deuses."
                    );
                    //insertMessageNoGodFound();
                    insertAllGods(allGodsArray);
                } else {
                    //implica pesquisar===false,logo mostra todos os deuses
                    console.log("tttttELSE - ENTROU AQUI!!", allGodsArray);
                    allGodsArray = respostaIndex.dataGods;
                    insertAllGods(allGodsArray);
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

/*@author:letonio - criando uma página principal de teste*/
function addEventsToMainPageTest() {
    addEventsToHeader(); //estou colocando com header para testar
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
            await tentaFazerLogin(username, password);
            redirectToMenuAdmPage();
        } catch (error) {
            displayWarning(error);
        }
        //redirectToMenuAdmPage();
    });
}

//change name function
async function tentaFazerLogin(_username, _password) {
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
        throw "[erro] ao tentar fazer login!";
    }
    const jsonData = await response.json();
    console.log("LOGIN - JSON OBTIDO:", jsonData);
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
            console.log("caiu opt1");
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
// Add eventos no menu lateral
function addEventsToMenuPage() {
    addEventsToHeader();
    const pageIcon = document.querySelector("#home-page");
    addUniqueEventListener(pageIcon, "click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        ///redirectToMyPrincipal();
        redirectToAllCategories();
    });

    const godIcon = document.querySelector("#gods-page");
    addUniqueEventListener(godIcon, "click", () => {
        //redirectToGodDetailsPage();
        redirectToAllGods("Allgods");
    });

    const categoriesIcon = document.querySelector("#categories-page");
    addUniqueEventListener(categoriesIcon, "click", () => {
        //redirectToMyPrincipal();
        redirectToAllCategories();
    });
}

export function displayWarning(_message) {
    //alert(_message);
    const bodyTag = document.querySelector("body");
    const createTag = document.createElement("div");
    bodyTag.appendChild(createTag);
    createTag.classList.add("table-modal");

    const message = document.createElement("p");
    message.classList.add("modal");
    message.innerHTML = _message;

    createTag.appendChild(message);

    setTimeout(function () {
        document.querySelector(".modal").classList.add("show"); // adiciona a classe para ampliar a largura gradualmente
    }, 10);

    addUniqueEventListener(createTag, "click", () => {
        createTag.remove();
    });
}

/*********************************************/
/*events that are added to EVERY HEADER
/*********************************************/
//declarando variavl usada na barra de pesquisa para armazenar, ID setTImeout
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

    //Adicionando evento na barra de pesquisa
    const inputSearchBar = document.querySelector(".search-input");
    addUniqueEventListener(inputSearchBar, "keyup", (event) => {
        console.log("VALOR DO INPUT:", event.target.value);
        debouncePesquisar(event.target.value);
    });
}

function debouncePesquisar(texto) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        pesquisar(texto);
    }, 800);
}
// Função chamada após o tempo depois do último clique
async function pesquisar(texto) {
    // Enviar requisição para o servidor
    console.log("HORA DE FAZER A REQUISIÇÃO sobre esse texto!", texto);
    console.log("HORA DE FAZER A REQUISIÇÃO sobre esse array!", texto);

    const arrayWords = texto.split(/\s|,/); //regex to split blankspace or , //= ["muito", "ddd"];
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

            if(success){
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

    console.log(objBody, "OBJ BODY");
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
        console.log("CADASTRO - JSON OBTIDO:", jsonData);
        displayWarning("Cadastrado com sucesso!")
        return true;
    } catch (error) {
        console.log(error, "Erro ao fazer cadastro!");
        displayWarning(error)
        return false;
    }
}

function clearSearchBar(){
    const inputSearchBar = document.querySelector(".search-input");
    inputSearchBar.value = "";
}