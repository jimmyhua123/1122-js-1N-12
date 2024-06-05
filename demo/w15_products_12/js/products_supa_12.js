//import { products_xx, all_products_xx } from './p1_data_xx.js';

import { _supabase } from "./clientSupabase_12.js";

let products_xx = [];

const getProductsSupabase_xx = async () => {
  try{
    let {data,error}= await _supabase.from('product_xx')
    .select('*');
    console.log('product data',data);
    return data;
  }catch(error){
    console.log(error);
  }
};
const productContainer = document.querySelector(".products-container");
console.log("products_xx", products_xx);

const displayProducts = (products) => {
  let productsContent =products.map((product)=>{
    const {name,price,image}=product.fields;
    // const {id}=product;
    return `
    <div class="single-product">
        <img
          src=${image}
          class="single-product-img img"
          alt=${name}
        />
        <footer>
          <h3 class="name">${name}</h3>
          <span class="price">$${price}</span>
        </footer>
      </div>
    `
  }).join('');
  productContainer.innerHTML=productsContent;
};

document.addEventListener("DOMContentLoaded", async() => {
  products_xx =await  getProductsSupabase_xx();
  displayProducts(products_xx);
});
