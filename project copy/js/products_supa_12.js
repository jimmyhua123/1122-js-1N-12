import { _supabase } from "./clientSupabase_12.js";

// 現有產品相關的程式碼
let products_12 = [];

const productContainer = document.querySelector(".products-container");
const companyBtns = document.querySelectorAll(".company-btn");

const displayProducts = (products) => {
    let productsContent = products.map((product) => {
        const { title, price, remoteImg } = product;
        return `
        <div class="single-product">
            <img src=${remoteImg} class="single-product-img img" alt=${title} />
            <footer>
              <h3 class="name">${title}</h3>
              <span class="price">$${price}</span>
            </footer>
          </div>
        `;
    }).join("");
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

companyBtns.forEach((btn) => {
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

// 登入表單的顯示/隱藏邏輯
const loginBtn = document.getElementById("login-btn");
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const signInBtn = document.getElementById("login");
const signInCloseBtn = document.getElementById("sign-in-close-btn");
const signUpCloseBtn = document.getElementById("sign-up-close-btn");

loginBtn.addEventListener("click", () => {
    container.style.display = "block";
});

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

signInBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signInCloseBtn.addEventListener('click', () => {
    container.style.display = "none";
});

signUpCloseBtn.addEventListener('click', () => {
    container.style.display = "none";
});

// 新增登入功能
const loginForm = document.querySelector(".sign-in form");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    try {
        const { user, session, error } = await _supabase.auth.signIn({
            email,
            password,
        });

        if (error) throw error;
        alert('登入成功！');
        console.log('User:', user);
        console.log('Session:', session);
    } catch (error) {
        alert('登入失敗：' + error.message);
        console.log(error);
    }
});
