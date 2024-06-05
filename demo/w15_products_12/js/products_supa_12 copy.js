
import { _supabase } from "./clientSupabase_12.js";

let products_12 = [];

const getProductsSupabase_xx = async () => {
  try{
    let {data,error}= await _supabase
    .from('products_12')
    .select('* company_12(*)');
    console.log('products data',data);
    return data;
  }catch(error){
    console.log(error);
  }
};



const productContainer = document.querySelector(".products-container");
const compantBtns = document.querySelectorAll(".company-btn");
console.log("products_12", products_12);

const displayProducts = (products) => {
  let productsContent =products.map((product)=>{
    const {title,price,localImg}=product;
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
    `
  }).join('');
  productContainer.innerHTML=productsContent;
};

compantBtns.forEach((btn)=>{
  btn.addEventListener("click",async (e)=>{
    const companyName = e.currentTarget.dataset.id;
    console.log("companyName",companyName);
    if(companyName==="all"){
      products_12 =await getProductsSupabase_xx();
    }else{
      let {data:company,error1}= await _supabase
      .from('company_12')
      .select('id')
      .eq('name',companyName);
      console.log("companydata",company[0].id);
      let {data,error2}= await _supabase
      .from('products_12')
      .select('*')
      .eq('companyId',company[0].id);
      console.log(`${companyName} products`,data);
      products_12=data;
    }
    displayProducts(products_12);
  });
});

document.addEventListener("DOMContentLoaded", async() => {
  products_12 =await  getProductsSupabase_xx();
  displayProducts(products_12);
});
