import { _supabase } from "./clientSupabase_12.js";

let products_12 = [];

const productContainer = document.querySelector(".products-container");
const compantBtns = document.querySelectorAll(".company-btn");

const displayProducts = (products) => {
  let productsContent = products
    .map((product) => {
      const { title, price, remoteImg } = product;
      return `
    <div class="single-product">
        <img
          src=${remoteImg}
          class="single-product-img img"
          alt=${title}
        />
        <footer>
          <h3 class="name">${title}</h3>
          <span class="price">$${price}</span>
        </footer>
      </div>
    `;
    })
    .join("");
  productContainer.innerHTML = productsContent;
};

const getProductsSupabase_xx = async () => {
  try {
    let { data, error } = await _supabase
      .from("products_xx")
      .select("*, company_xx(*)");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

compantBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    const companyName = e.currentTarget.dataset.id;
    console.log("companyName", companyName);
    const products = await getProductsSupabase_xx();
    console.log("allproducts", products);

    if (companyName === "all") {
      products_12 = products;
    } else {
      products_12 = products.filter((product) => {
        return product.company_xx && product.company_xx.name === companyName;
      });
    }
    console.log(`${companyName} products`, products_12);
    displayProducts(products_12);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  products_12 = await getProductsSupabase_xx();
  displayProducts(products_12);
});
