import { redirectToAllGods } from "../pages/all-gods-page.js";
import { redirectToCategoryChoosed } from "../pages/cards_god_from_categ.js";
import { addUniqueEventListener } from "./event-listener.js";

export function RenderButtonBack(categoryId){
    const root =  document.querySelector("#root");
    const btnBack = document.createElement("button");
    
    btnBack.classList.add("btn-back-cards");
    btnBack.innerHTML = "Voltar";
    addUniqueEventListener(btnBack, "click", () =>  {
        PreviousPage(categoryId)
    })
    root.appendChild(btnBack);
}
//RenderButtonBack(categoriesList[currentIndexCategory].id)
function PreviousPage(categoryId){
    if(categoryId === -1){
        redirectToAllGods("Allgods");
    }else{
        redirectToCategoryChoosed(categoryId);
    }
}