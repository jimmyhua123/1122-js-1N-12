//import { products_xx, all_products_xx } from './p1_data_xx.js';

import { _supabase } from "./clientSupabase_xx.js";

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

const DisplayProducts = (products) => {};

document.addEventListener("DOMContentLoaded", async() => {
  products_xx =await  getProductsSupabase_xx();
  DisplayProducts(products_xx);
});
