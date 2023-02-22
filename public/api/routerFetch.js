//FAZENDO IMPORTS
import {
    addResourcesToCategoriesPage,
    addResourcesToCategoryChoosed,
    addResourcesToTableOfCategories,
    addResourcesToEditCategoryPage,
} from "./categories/fetchs_Categories.js";

import {
    addResourcesToGodChoosed,
    addResourcesToTableOfGods,
    addResourcesToGodInfo,
    addResourcesToEditGodPage,
} from "./gods/fetchs_Gods.js";

//------------------------------------------------------------------------
// ADDS RESOURCES TO THE PAGE THA WAS RENDERED ACCORDING URL
//-----------------------------------------------------------------------

export async function addExternalResourcesTo(url, criteria) {
    switch (url) {
        ////case "/":
        ///   addResourcesToPrincipal();
        ///  break;
        // /
        case "/categories":
            return addResourcesToCategoriesPage();
        case "principalteste":
            //this page doesnt have dynamic features
            break;
        case "/categories/:id":
            console.log("PRECISO ADICIONAR RECURSOS NO ID", criteria.id);
            return addResourcesToCategoryChoosed(criteria.id);
        case "/login":
            //coloquei aqui a qustão de remover o cookie
            if (criteria.releaseCookie) {
                await removeCookieDoNavegador();
            }
            return;
        case "/categories/d1":
            return addResourcesToGodChoosed(criteria.godId);

        case "/tableCategories":
            return addResourcesToTableOfCategories(criteria);
        case "/tableGods":
            return addResourcesToTableOfGods(criteria);

        case "/godInfo/g1":
            return await addResourcesToGodInfo(criteria.godId);

        case "/editGod/g1":
            return addResourcesToEditGodPage(criteria.godId);

        case "/editCategory":
            return await addResourcesToEditCategoryPage(criteria.id);
        case "/addGod":
            return addResourcesToCategoriesPage();
        default:
            return null;
    }
}

//Provavelmente essa funcao de remover cookie fará parte
//de um modulo de fetch_users, que estará relacionado com os usuários
//por enquanto deixarei por aqui
async function removeCookieDoNavegador() {
    try {
        const response = fetch("http://localhost:8080/logout", {
            method: "DELETE",
        });
        console.log("COOKIE STATUS:", response.status);

        if (response.status !== 200 && response.status !== 201) {
            const resJson = await response.json();
            const { message, error } = resJson;
            displayWarning(resJson.error);
            throw `${error}`;
        }
        const resJson = await response.json();
        console.log("DELETAR COOKIE DEU CERTO jason:", resJson);
        displayWarning(resJson.message); //deu tudo  certo
    } catch (error) {
        console.log("COOKIE, AO TENTAR REMOVER DEU ERRO", error);
    }
}
