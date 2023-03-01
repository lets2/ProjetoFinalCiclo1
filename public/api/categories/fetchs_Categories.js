export async function addResourcesToCategoriesPage() {
    try {
        const response = await fetch("/categories");
        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante a busca das categorias!";

        const objContent = await response.json();
        return objContent.data;
    } catch (error) {
        console.log("Erro durante o fetch:", error);
        return ""; //retunrn empty string
    }
}

/*add resource as páginas escolhdas*/
export async function addResourcesToCategoryChoosed(id) {
    try {
        const response = await fetch(`/categories/${id}/all`);

        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema durante a busca das categorias!";

        const objContent = await response.json();

        return objContent.data;
    } catch (error) {
        console.log("Erro durante o fetch:", error);
        return ""; //return empty string
    }
}

export async function addResourcesToTableOfCategories() {
    try {
        const response = await fetch(`/categories/`);

        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Houve um problema na requisicao!";

        const objContent = await response.json();

        return objContent.data; //talvez seja .data[0]
    } catch (error) {
        console.log("Erro durante o fetch:", error);
        return ""; //return empty string
    }
}
//#input-cat-edit-name//cat
export async function addResourcesToEditCategoryPage(id) {
    try {
        const response = await fetch(`/categoriestable/${id}/`);

        if (response.status !== 200 && response.status !== 201)
            throw "[erro] Problema ao tentar pegar ocategoria ppelo ID!";

        const objContent = await response.json();
        const catInformation = objContent.data[0];

        return catInformation;
    } catch (error) {
        console.log("Erro durante o fetch:", error);
        return ""; //return empty string
    }
}
