import { tours_12 } from "./data_12.js";
console.log("tours_12", tours_12);

const section = document.querySelector(".section-center");

const displayTours_12 = () => {
  const toursInfo = tours_12
    .map((tour) => {
      return `
        <article class="single-tour">
        <img src="./img/paris.jpg" alt="Best of Paris in 7 Days Tour" />
        <footer>
          <div class="tour-info">
            <h4>Best of Paris in 7 Days Tour</h4>
            <h4 class="tour-price">$1,995</h4>
          </div>
          <p>
            Paris is synonymous with the finest things that culture can
            offer — in art, fashion, food, literature, and ideas. On this
            tour, your Paris-savvy Rick Steves guide will immerse you in the
            very best of ...<button>read more</button>
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
