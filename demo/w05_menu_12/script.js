// 改為這樣
import menu from "./data_12.js";

const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

console.log("menu", menu);

const displayMenuItems = (menu) => {
  let displayMenu = menu
    .map((item) => {
      const { id, title, category, price, img, desc } = item;
      return `       
         <article class="menu-item">
        <img
          src=${img}
          alt="buttermilk"
          pancakes=""
          class="photo"
        />
        <div class="item-info">
          <header>
            <h4>${title}</h4>
            <h4 class="price">$${price}</h4>
          </header>
          <p class="item-text">${desc}
          </p>
        </div>
      </article>`;
    })
    .join("");
   //console.log("displayMenu", displayMenu);
  sectionCenter.innerHTML = displayMenu;
};

const category = ["all", "breakfast", "lunch", "dinner", "shakes"];

const displayMenuButtons = (category) => {
    let displayB = category.map((choose)=>{
        const{all,breakfast,lunch,dinner,shakes}=choose;
  return `
    <button type="button" class="filter-btn" data-id=${choose}>${choose}</button>
    `;
    }).join("");
    console.log("displayB", displayB);
    btnContainer.innerHTML=displayB;
};

window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu);
  displayMenuButtons(category);
});
