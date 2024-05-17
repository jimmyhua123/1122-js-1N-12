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

const displayMenuButtons = () => {
  
  // const categories = ["all", "breakfast", "lunch", "dinner", "shakes"];
  const menuCategories = new Set(
    menu.map((item) => {
      return item.category;
    })
  );
  // console.log('menuCategories',menuCategories);
  const categories = ["all", ...menuCategories];
  //  console.log('Categories',categories);


  let menuButtons = categories
    .map((choose) => {
      const { all, breakfast, lunch, dinner, shakes } = choose;
      return `
    <button type="button" class="filter-btn" data-id=${choose}>${choose}</button>
    `;
    })
    .join("");
  //console.log("menuButtons", menuButtons);
  btnContainer.innerHTML = menuButtons;

  const filterBtns = document.querySelectorAll(".filter-btn");
  console.log("filterBtns", filterBtns);
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("data-id", e.currentTarget.dataset.id);
      const category = e.currentTarget.dataset.id;
      const filterMeun = menu.filter((item) => item.category === category);
      if(category==='all'){
        displayMenuItems(menu);
      }else{
        displayMenuItems(filterMeun);
      }
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu);
  displayMenuButtons();
});
