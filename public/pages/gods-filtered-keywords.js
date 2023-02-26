import CriaEventStateChange from "./event-url.js";

/*@autor:filipe*/

export function GodSFilteredByKeywords() {
    const div = document.createElement("div");

    div.innerHTML = `
    <header class="flex-row-between">
      <div class="header-items flex-row-center logo-search">
          <img id="logo" src="../assets/icons/logo-godpedia.png" alt="">
          <div class="container-search flex-row-center">
          <input class="search-input" type="text"> 
          <div class="search">
                  <img class="search-icon" src="../assets/icons/search.svg" alt="">
          </div>
          </div>
      </div>
      <div class="header-items flex-row-end menu-icon-div">
          <img id="profile-icon" src="../assets/icons/profile.svg" alt="">
          <img id="menu-icon" src="../assets/icons/menu.svg" alt="">
      </div>
</header>
    <main class="flex-center-center">
      <!-- @author: Daniel-->
      <div id="container-page-keywords-test">
        
      </div>
    </main>
    <footer></footer>
	`;

    return div;
}
