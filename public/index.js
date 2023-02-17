import {
    redirectToCategoryChoosed,
    redirectToLoginAdmPage,
    redirectToGodDetailsPage,
    redirectToMenuAdmPage,
    redirectToTableEditCategories,
    redirectToTableEditGods,
    redirectToAddGodPage,
    redirectToGodInfoPage,
    redirectToEditGodPage,
    redirectToMenu,
    redirectToAddCategory,
    redirectToEditCategory,
} from "./pages/main-page.js";
import { redirectToMyPrincipal } from "./pages/category-page.js";

import GeraObjComRotas from "./pages/router.js";

const root = document.querySelector("#root");
const objRotas = GeraObjComRotas();

//inicia
const page = objRotas.getPage("/");
root.innerHTML = "";
root.appendChild(page);

//ouvir evento de "onstatechange"
window.addEventListener("onstatechange", (event) => {
    const url = event.detail.url;
    console.log("DISPAROU E A URL EH", url);
    const page = objRotas.getPage(url);
    history.pushState({}, "", url);
    root.innerHTML = "";
    root.appendChild(page);
    addEventsRelatedTo(url); //chama os eventos relacionados aquela página
});

/*
VOU ADICIONAR UM MONTE DE EVENTOS AQUI DE ACORDO COM A PÁGINA
*/

function addEventsRelatedTo(url) {
    console.log("vamos ver a url:", url);
    switch (url) {
        case "/":
            addEventsToPrincipal();
        case "/category":
            eventosDaCategoriaEscolhida();
        case "/login":
            eventosDoLoginDeAdm();
        case "/category/d1":
            eventosDosDetalhesDoDeus();
        case "/adm/a1":
            eventosDoMenuDeAdm();
        case "/tableCategories":
            adicionaEventosNaPaginaDaTabelaCategorias();
        case "/tableGods":
            adicionaEventosNaPaginaDaTabelaGods();
        case "/addGod":
            adicionarEventosNaPaginaDeAdicaoDeDeus();
        case "/godInfo/g1":
            adicionarEventosNaPaginaDeGodInfo();
        case "/editGod/g1":
            adicionarEventosNaPaginaDeEdicaoDeDeus();
        case "/menu":
            adicionarEventosNoMenu();
        case "/addCategory":
            adicionarEventosAddCateg();
        case "/editCategory":
            adicionarEventosEditCateg();
            break;
    }
}

/*Eventos relacionados a página principal*/
export function addEventsToPrincipal() {
    /////console.log("ADICIONA LISTENER NO BOTÃO GIGANTE!");

    /*Adiciona evento ao templo que está sendo mostrad nesse momento*/
    const containerTemples = document.querySelector(".container-temples");
    containerTemples.addEventListener("click", () => {
        //// console.log("ATIVOU EVENTO E VA RENDERIZARNOVA PAGINA");
        redirectToCategoryChoosed();
    });

    /*add evento para mudar imagem das setas*/
    const arrowLeft = document.querySelector(".category-arrow-left");
    //// console.log("OLHA A SETA", arrowLeft);
    arrowLeft.addEventListener("mouseover", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-left-orange.svg"
        );
    });
    arrowLeft.addEventListener("mouseout", (event) => {
        event.target.setAttribute("src", "./assets/icons/arrow-left-white.svg");
    });
    const arrowRight = document.querySelector(".category-arrow-right");
    //////console.log("OLHA A SETA", arrowRight);
    arrowRight.addEventListener("mouseover", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-right-orange.svg"
        );
    });
    arrowRight.addEventListener("mouseout", (event) => {
        event.target.setAttribute(
            "src",
            "./assets/icons/arrow-right-white.svg"
        );
    });

    eventosAdicionadosNoHeader();
}
/*eventos relacionados a pagina da categoria escolhida*/
function eventosDaCategoriaEscolhida() {
    eventosAdicionadosNoHeader();
    eventosAdicionadosEmCadaCartao();
}
/*eventos relacionados a pagina de login do adm*/
function eventosDoLoginDeAdm() {
    eventosAdicionadosNoHeader();
    adicionaEventoNoBotaoDeLogin();
}
function adicionaEventoNoBotaoDeLogin() {
    const buttonLogin = document.querySelector("#login-logo-button");
    buttonLogin.addEventListener("click", () => {
        redirectToMenuAdmPage();
    });
}

/*eventos relacionados a página com a descrição dos deuses*/
function eventosDosDetalhesDoDeus() {
    eventosAdicionadosNoHeader();
}

/*eventos adicionados em casa cartao da pagina da categoria escolhida*/
function eventosAdicionadosEmCadaCartao() {
    for (let i = 1; i <= 4; i++) {
        let godCard = document.querySelector(`.card${i.toString()}`);
        //////  console.log("ENtrou no for", godCard);
        godCard.addEventListener("click", () => {
            redirectToGodDetailsPage();
        });
    }
}

/*Eventos adicionados no menu do administrador*/
function eventosDoMenuDeAdm() {
    eventosAdicionadosNoHeader();

    console.log("Entrou na página do menu e esta add evento!");

    const objMenuAdm = [
        { label: "#edit-profile", handle: redirectToTableEditCategories },
        { label: "#change-password", handle: redirectToTableEditCategories },
        { label: "#edit-categories", handle: redirectToTableEditCategories },
        { label: "#edit-gods", handle: redirectToTableEditGods },
        { label: "#logout", handle: redirectToLoginAdmPage },
    ];

    objMenuAdm.forEach((element) => {
        const menuOption = document.querySelector(element.label);
        console.log("Pagina do menu, evento procura elemento");
        menuOption.addEventListener("click", () => {
            element.handle();
        });
    });
}

/*Adicionando eventos na página que tem uma tabela de categorias*/
function adicionaEventosNaPaginaDaTabelaCategorias() {
    eventosAdicionadosNoHeader();
    /*insere evento no botao de add categoria*/
    const btnAddCategory = document.querySelector("#create-new-category");
    btnAddCategory.addEventListener("click", ()=> {
        redirectToAddCategory()
    })
    const btnEditCategory = document.querySelector(".edit-btn");
    btnEditCategory.addEventListener("click", ()=> {
        redirectToEditCategory()
    })
}

/*Adicionando eventos na página que tem uma tabela de deuses*/
function adicionaEventosNaPaginaDaTabelaGods() {
    eventosAdicionadosNoHeader();
    /*insere evento no botão de adicionar um novo deus*/
    const buttonAddGod = document.querySelector("#create-new-god");
    buttonAddGod.addEventListener("click", () => {
        redirectToAddGodPage();
    });

    /*Insere evento na tabela, caso o usuario clique numa linha da tabela
	de deuses aparece uma página para detalhamento e edicao
	referente aquele elemento*/
    const trList = document.querySelectorAll("tbody tr");
    trList.forEach((trElement) => {
        trElement.addEventListener("click", (event) => {
            const tdElement = event.target;
            console.log("essse eh o alvo:", tdElement);
            console.log("tag do parent:", tdElement.parentNode.tagName);

            if (tdElement.parentNode.tagName === "TR") {
                const rowIdGod = tdElement.parentNode.id;
                console.log("Olha a ID dessa linha:", rowIdGod);
                redirectToGodInfoPage("idDoDeus"); /*posteriormente isso sera*/
            }
        });
    });
}

/*Add eventos na página que tem a opcao de adicionar um novo deus*/
function adicionarEventosNaPaginaDeAdicaoDeDeus() {
    eventosAdicionadosNoHeader();
    /*evento nos botoes de adicionar e cancelar*/
    const cancelButton = document.querySelector(".cancel-button");
    const addGodButton = document.querySelector("#add-god-button");
    cancelButton.addEventListener("click", () => {
        redirectToTableEditGods();
    });
    addGodButton.addEventListener("click", () => {
        redirectToTableEditGods();
    });
}
/*Add eventos na página que mostra infos sobre deuses (inclusive editar/excluir)*/
function adicionarEventosNaPaginaDeGodInfo() {
    eventosAdicionadosNoHeader();
    /*Add eventos para quando clicam em EDITAR E EXCLUIR */
    const editGodButton = document.querySelector("#edit-god-button");
    editGodButton.addEventListener("click", () => {
        redirectToEditGodPage();
    });
}

/* Add eventos na página que mostra as informacoes para editar deuses*/
function adicionarEventosNaPaginaDeEdicaoDeDeus() {
    eventosAdicionadosNoHeader();
}

// Add eventos no menu lateral
function adicionarEventosNoMenu(){
    eventosAdicionadosNoHeader()
    const pageIcon = document.querySelector("#home-page");
    pageIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToMyPrincipal();
    });

    const godIcon = document.querySelector("#gods-page");
    godIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToGodDetailsPage();
    });

    const categoriesIcon = document.querySelector("#categories-page");
    categoriesIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToMyPrincipal();
    });


}
// Add eventos na página de adicionar categoria
function adicionarEventosAddCateg(){
    eventosAdicionadosNoHeader();
    const btnCancel = document.querySelector("#Cancelar");
    btnCancel.addEventListener("click", () => {
        redirectToTableEditCategories()
    });
    const btnAddCategory = document.querySelector("#Adicionar");
    btnAddCategory.addEventListener("click", () => {
        redirectToTableEditCategories()
    });

}

// Add eventos na página de editar categoria
function adicionarEventosEditCateg(){
    eventosAdicionadosNoHeader();
    const btnCancel = document.querySelector("#Cancelar");
    btnCancel.addEventListener("click", () => {
        redirectToTableEditCategories()
    });
    const btnEditCategory = document.querySelector("#Adicionar");
    btnEditCategory.addEventListener("click", () => {
        redirectToTableEditCategories()
    });
}
/*********************************************/
/*eventos que são adicionados em todo header*/
/*********************************************/

function eventosAdicionadosNoHeader() {
    /*adiciona evento de clicar na logo e ir para a principal*/
    ////////console.log("ADICIONA LISTENER NA LOGO!");
    const logo = document.querySelector("#logo");
    logo.addEventListener("click", () => {
        ///////console.log("ATIVOU EVENTO E VA RENDERIZAR a principal");
        redirectToMyPrincipal();
    });
    /*adiciona evento para ir para página de login*/
    /*Adiciona evento para o PROFILE ICON PERFIL*/
    const profileIcon = document.querySelector("#profile-icon");
    profileIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToLoginAdmPage();
    });

    const menuIcon = document.querySelector("#menu-icon");
    menuIcon.addEventListener("click", () => {
        ////////console.log("ATIVOU EVENTO E VA RENDERIZAR O LOGIN");
        redirectToMenu();
    });
}
