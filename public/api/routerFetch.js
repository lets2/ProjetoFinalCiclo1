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
        default:
            return null;
    }
}
