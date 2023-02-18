import { Principal } from "./main-page.js";
import Brigadeiros from "./brigadeiros-page.js";
import Cupcakes from "./cupcakes-page.js";
import Doces from "./doces-page.js";
import { Category } from "./category-page.js";
import { Login } from "./login-page.js";
import { GodChoosed } from "./god-card-details-page.js";
import { MenuAdm } from "./adm_perfil_page.js";
import { TableCategories } from "./table_categories.js";
import { TableGods } from "./table_gods.js";
import { AddGod } from "./add-god.js";
import { GodInfo } from "./see-god-info.js";
import { EditGod } from "./edit-god.js";
import { Menu } from "./menu.js";
import { AddCategory } from "./add-cat-model_filipe_page_2.js";
import { EditCategory } from "./edit-cat-model_filipe_page_3.js";
export default function GeraObjComRotas() {
    const objRotas = {
        "/": Principal(),
        "/brigadeiros": Brigadeiros(),
        "/cupcakes": Cupcakes(),
        "/doces": Doces(),
        "/category/:id": Category(),
        "/login": Login(),
        "/category/d1": GodChoosed(),
        "/adm/a1": MenuAdm(),
        "/tableCategories": TableCategories(),
        "/tableGods": TableGods(),
        "/addGod": AddGod(),
        "/godInfo/g1": GodInfo(),
        "/editGod/g1": EditGod(),
        "/menu": Menu(),
        "/addCategory": AddCategory(),
        "/editCategory": EditCategory(),

        getPage: function (url) {
            return this[url];
        },
    };
    return objRotas;
}
