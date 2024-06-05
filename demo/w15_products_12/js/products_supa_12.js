import { _supabase } from "./clientSupabase_12.js";

let products_12 = [];

const productContainer = document.querySelector(".products-container");
const compantBtns = document.querySelectorAll(".company-btn");
// console.log("products_12", products_12);

const displayProducts = (products) => {
  let productsContent = products
    .map((product) => {
      const { title, price, localImg } = product;
      // const {id}=product;
      return `
    <div class="single-product">
        <img
          src=${localImg}
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
      .from("products_12")
      .select("*, company_12(*)");
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
    if (companyName === "all") {
      products_12 = products;
    } else {
      products_12 = products.filter(
        (product) => product.company_12.name === companyName
      );
    }
    console.log(`${companyName}products`, products_12);
    displayProducts(products_12);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  products_12 = await getProductsSupabase_xx();
  displayProducts(products_12);
});
