export async function addResourcesToCategoriesPage() {
    try {
        const response = await fetch("http://localhost:8080/categories");
        console.log("STATUS:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante a busca das categorias!";

        const objContent = await response.json();
        return objContent.data;
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

        /////const nameCategory = objContent.data[0].name_category;
        /// const arrayGods = objContent.data;
        return objContent.data;

        document
            .querySelector(".container-page-gods")
            .classList.remove("hidden");
        //// renderCategoriesOnMainPage(objContent.data);
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

        return objContent.data; //talvez seja .data[0]
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}
//#input-cat-edit-name//cat
export async function addResourcesToEditCategoryPage(id) {
    console.log("ENTROU NESSA FUNCAO PELA", "º vez!");
    console.log("MODULO fetchs_categories:", id);
    try {
        const response = await fetch(
            `http://localhost:8080/categoriestable/${id}/`
        );
        console.log("STATUS EDIT:", response.status);
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Problema ao tentar pegar ocategoria ppelo ID!";

        const objContent = await response.json();
        console.log("Resultado GET CATEGORY BY ID:", objContent);
        const catInformation = objContent.data[0];

        return catInformation;
    } catch (error) {
        console.log("Erro durante o fetch:", error);
    }
}
