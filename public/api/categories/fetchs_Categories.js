export async function addResourcesToCategoriesPage() {
    try {
        const response = await fetch("http://localhost:8080/categories");
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante a busca das categorias!";
        const vetordedeuses = [
            { nome: "fulano", status: "zap" },
            { nome: "fulano", status: "zap" },
        ];
        const objContent = await response.json();
        return objContent.data;
        // renderCategoriesOnMainPage(objContent.data);
        //renderCurrentCategoryOnCategoriesPage(objContent.data);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

/*add resource as páginas escolhdas*/
export async function addResourcesToCategoryChoosed(id) {
    try {
        const response = await fetch(
            `http://localhost:8080/categories/${id}/all`
        );
        console.log("STATUS DA RESPOSTA DO FETCH:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante a busca das categorias!";

        const objContent = await response.json();
        console.log("Esse é o resultado vindo do backend:", objContent);
        console.log("Esse é o resultado vindo do backend:", objContent.data);

        const nameCategory = objContent.data[0].name_category;
        const arrayGods = objContent.data;
        return { nameCategory, arrayGods };
        console.log("Meu array de deuses:", arrayGods);
        ///  insertImages(arrayGods);
        //// insertCategoryName(nameCategory);

        //apos inserir tudo se esta'tudo okay então faz aparecer a tela
        document
            .querySelector(".container-page-gods")
            .classList.remove("hidden");
        //// renderCategoriesOnMainPage(objContent.data);
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

//@author:filipe
export async function addResourcesToGodChoosed(godId) {
    //CRIAR UM OBJETO COM OS DADOS DO DEUS

    /*Fetch request*/
    try {
        const response = await fetch(
            `http://localhost:8080/godstable/${godId}/`
        );
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        console.log("Resultado da requisição VER GOD DETAILS:", objContent);
        const godInformation = objContent.data[0];
        /// renderCategoriesOnMainPage(objContent.data);
        // const quantify = categories.length;

        //INSERIR OS DADOS DO DEUS NA PÁGINA
        const container_data = document.querySelector("#container-god-img");
        container_data.innerHTML = "";
        container_data.innerHTML = `
            <div id="container-god-img">
            <div class="flex-col-center" id="div-img-god">
                <div>
                    <img src="../assets/images/gods/${godInformation.src_img}" alt="" />
                </div>
            </div>
            <div class="flex-col-center container-god-text">
                <h1 class="god-text-title">${godInformation.name}</h1>
                <h2 class="god-text-subtitle">${godInformation.status}</h2>
                <p class="god-text-description">
                ${godInformation.resume}
                </p>
            </div>`;

        return godInformation;
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}

export async function addResourcesToTableOfCategories() {
    try {
        const response = await fetch(`http://localhost:8080/categories/`);
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();
        const categories = objContent.data;
        /// renderCategoriesOnMainPage(objContent.data);
        // const quantify = categories.length;
        //addLinesCategoryTable(categories);
        return objContent.data; //talvez seja .data[0]
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}
