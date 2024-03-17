import { tours_12 } from "./data_12.js";
console.log("tours_12", tours_12);

const section = document.querySelector(".section-center");

const displayTours_12 = () => {
  const toursInfo = tours_12
    .map((tour) => {
        const {id,info,local_img,name,price }=tour;
      return `
        <article class="single-tour">
        <img src=${local_img} alt=${id} />
        <footer>
          <div class="tour-info">
            <h4>${name}</h4>
            <h4 class="tour-price">$${price}</h4>
          </div>
          <p>
            ${info}
            <button>read more</button>
          </p>
          <button class="delete-btn">not interested</button>
        </footer>
      </article>
        `;
    })
    .join("");
  section.innerHTML = toursInfo;
};

window.addEventListener("DOMContentLoaded", () => {
  displayTours_12();
});
