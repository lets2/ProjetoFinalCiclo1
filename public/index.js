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
    const index = event.detail.index; //o valor padrão de index=null, se diferente de null implia q
    console.log("DISPAROU E A URL EH", url);
    const page = objRotas.getPage(url);
    history.pushState({}, "", url);
    root.innerHTML = "";
    root.appendChild(page);
    addExternalResourcesTo(url, index);
    addEventsRelatedTo(url); //chama os eventos relacionados aquela página
});

/***************************************************
@AUTHOR:LETONIO VOu adicionar muitos recursos fetch
***************************************************
*/
/*index ou é nulo ou é um valor que aponta pra algo como a categoria*/
export function addExternalResourcesTo(url, index) {
    switch (url) {
        case "/":
            addResourcesToPrincipal();
        case "/category":
            console.log("PRECISO ADICIONAR RECURSOS NO INDEX:", index);
            addResourcesToCategoryChoosed(index);
            break;
    }
}

/*Usando fetch para pegar as imagens da página;*/
async function addResourcesToPrincipal() {
    try {
        const response = await fetch("http://localhost:8080/categories");
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante a busca das categorias!";

        const objContent = await response.json();
        renderCategoriesOnMainPage(objContent.data);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

function renderCategoriesOnMainPage(categories) {
    console.log("Pegou tudo que eu queria:", categories);
    const index = 2; //

    renderImgCategory(index, categories[index].name, categories[index].src);

    const quantify = categories.length;
    renderBallsBelowImg(index, quantify);
}

function renderImgCategory(index, categoryName, categorySrc) {
    const imagem = document.querySelector("#temple");
    const categoryTitle = document.querySelector(".temple-legend");
    imagem.setAttribute("src", `./assets/images/temples/${categorySrc}`);
    imagem.dataset.index = index; //adiciona um atributo personalizado dataset a imagem
    //dessa forma é possível manter no elemento a posicao daquele elemento no array
    categoryTitle.innerText = categoryName;
}

function renderBallsBelowImg(index, quantify) {
    //create balls-based on index-position-image
    const containerCircles = document.querySelector(".container-circles");
    containerCircles.innerHTML = ""; //Limpa o conteúdo
    for (let i = 0; i < quantify; i++) {
        const circle = document.createElement("button");
        circle.classList.add("circle");
        if (i === index) {
            circle.classList.add("circle-orange");
        }
        containerCircles.appendChild(circle);
    }
}

/*add resource as páginas escolhdas*/
async function addResourcesToCategoryChoosed(index) {
    try {
        const response = await fetch(
            `http://localhost:8080/categories/${index}/all`
        );
        console.log("STATUS DA RESPOSTA DO FETCH:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante a busca das categorias!";

        const objContent = await response.json();
        console.log("Esse é o resultado vindo do backend:", objContent);
        console.log("Esse é o resultado vindo do backend:", objContent.data);
        console.log(
            "Esse é o resultado vindo do backend:",
            Object.keys(objContent["data"])[0]
        );
        const nameCategory = Object.keys(objContent["data"])[0];
        const arrayGods = objContent["data"][nameCategory];
        console.log("Meu array de deuses:", arrayGods);
        insertImages(arrayGods);
        insertCategoryName(nameCategory);

        //apos inserir tudo se esta'tudo okay então faz aparecer a tela
        document
            .querySelector(".container-page-gods")
            .classList.remove("hidden");
        //// renderCategoriesOnMainPage(objContent.data);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

function insertImages(arrayGods) {
    console.log(arrayGods);
    const cardsGods = document.querySelectorAll(".cards-gods");
    cardsGods.forEach((element, index) => {
        element.setAttribute(
            "src",
            `./assets/images/gods/${arrayGods[index].src}`
        );
    });
}

function insertCategoryName(nameCategory) {
    console.log(nameCategory);
    document.querySelector(".phrase").innerHTML = nameCategory;
}

/************************************************************s
@AUTHOR:LETONIO VOU ADICIONAR UM MONTE DE EVENTOS AQUI DE ACORDO COM A PÁGINA
************************************************************/

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
            break;
    }
}

/*Eventos relacionados a página principal*/
export function addEventsToPrincipal() {
    /////console.log("ADICIONA LISTENER NO BOTÃO GIGANTE!");

    /*Adiciona evento ao templo que está sendo mostrad nesse momento*/
    const containerTemples = document.querySelector(".container-temples");
    containerTemples.addEventListener("click", (event) => {
        //// console.log("ATIVOU EVENTO E VA RENDERIZARNOVA PAGINA");
        console.log(
            "Quando clica no container, pega o index que está em dataset.index:"
        );
        console.log(containerTemples.childNodes[1].dataset.index);
        const index = containerTemples.childNodes[1].dataset.index;
        redirectToCategoryChoosed(index);
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

    arrowLeft.addEventListener("click", () => {
        const templeImage = document.querySelector("#temple");
        const newIndex = parseInt(templeImage.dataset.index) - 1;
        if (newIndex >= 0) {
            checkIfThereIsCorrespondingImage(newIndex);
        }
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

    arrowRight.addEventListener("click", () => {
        const templeImage = document.querySelector("#temple");
        const newIndex = parseInt(templeImage.dataset.index) + 1;
        if (newIndex >= 0) {
            checkIfThereIsCorrespondingImage(newIndex);
        }
    });

    eventosAdicionadosNoHeader();
}

async function checkIfThereIsCorrespondingImage(newIndex) {
    try {
        const response = await fetch(
            `http://localhost:8080/categories/${newIndex}`
        );
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante o cadastro! Tente novamente!";

        const objContent = await response.json();
        console.log("Olha o resultado de clicar com uma seta:", objContent);
        /// renderCategoriesOnMainPage(objContent.data);
        renderImgCategory(newIndex, objContent.data.name, objContent.data.src);
        //found-out total balls
        const quantify = document.querySelectorAll(".circle").length;
        console.log("QUantidade", quantify);
        renderBallsBelowImg(newIndex, quantify);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
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
}
