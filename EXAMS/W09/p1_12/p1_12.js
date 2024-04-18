import { products_12, all_products_12 } from './p1_data_12.js';

const productContainer = document.querySelector('.products-container');

console.log('products_12', products_12);

const DisplayProducts = (blogs) => {
  let displayBlogs = blogs
    .map((item) => {
      const { id, img,price, title, category } = item;
      return `
      <div class="single-product">
      <img
        src=${img}
        class="single-product-img img"
        alt="high-back bench"
      />
      <footer>
        <h3 class="name">${title} (3)</h3>
        <span class="price">$${price}</span>
      </footer>
    </div>
     `;
    })
    .join('');
    productContainer.innerHTML = displayBlogs;
};


document.addEventListener('DOMContentLoaded', () => {
  DisplayProducts(products_12);
});
