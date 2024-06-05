// import { products_xx, all_products_xx } from './p1_data_xx.js';

const url='https://www.course-api.com/javascript-store-products';

let products_xx = [];


const productContainer = document.querySelector('.products-container');


const fetchData = async () => {
  try{
    const response= await fetch(url)
    const data = await response.json();
    console.log("fetchdata", data);
    return data;
  }catch(error){
    console.log(error);
  }
};

console.log('products_xx', products_xx);


const displayProducts = (products) => {
  let productsContent =products.map((product)=>{
    const {name,price,image}=product.fields;
    // const {id}=product;
    return `
    <div class="single-product">
        <img
          src=${image[0].url}
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



document.addEventListener('DOMContentLoaded', async () => {
  products_xx = await fetchData();
  
  displayProducts(products_xx);


});
