//import { Principal } from "./main-page.js";
import { GodSFilteredByKeywords } from "./gods-filtered-keywords.js";
import { Categories } from "./all-categories-page.js";
import { Category } from "./cards_god_from_categ.js";
import { Login } from "./login-page.js";
import { GodChoosed } from "./god-card-details.js";
import { MenuAdm } from "./adm_perfil_sidebar.js";
import { TableCategories } from "./table_categories.js";
import { TableGods } from "./table_gods.js";
import { AddGod } from "./add-god.js";
import { GodInfo } from "./adm-god-info.js";
import { EditGod } from "./edit-god.js";
import { Menu } from "./menu.js";
import { AddCategory } from "./add-category.js";
import { EditCategory } from "./edit-cat.js";
import { PrincipalTeste } from "./principal-teste.js";
import { AllGodsPage } from "./all-gods-page.js";
import { RegisterUser } from "./register-user.js";
import { EditPasswd } from "./edit-passwd.js";
export default function GeraObjComRotas() {
    const objRotas = {
        /*"/": Principal(),*/
        "/godsFiltered": GodSFilteredByKeywords(),
        "/": PrincipalTeste(),
        "/categories": Categories(),
        "/categories/:id": Category(),
        "/login": Login(),
        "/categories/d1": GodChoosed(),
        "/adm/a1": MenuAdm(),
        "/tableCategories": TableCategories(),
        "/tableGods": TableGods(),
        "/addGod": AddGod(),
        "/godInfo/g1": GodInfo(),
        "/editGod/g1": EditGod(),
        "/menu": Menu(),
        "/addCategory": AddCategory(),
        "/editCategory": EditCategory(),
        "/allGods": AllGodsPage(),
        "/registerUser": RegisterUser(),
        "/editPassword": EditPasswd(),

        getPage: function (url) {
            return this[url];
        },
    };
    return objRotas;
}
