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

// 登入和註冊表單的顯示/隱藏邏輯
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

// 檢查電子郵件是否已存在
const checkEmailExists = async (email) => {
    const { data, error } = await _supabase
        .from('auth.users')
        .select('email')
        .eq('email', email);
    if (error) {
        console.error("Error checking email:", error);
        return false;
    }
    return data.length > 0;
};

// 新增註冊功能
const signUpForm = document.getElementById("sign-up-form");
signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
        alert('此電子郵件已經註冊過了！');
        return;
    }

    try {
        const { user, error } = await _supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw error;
        alert('註冊成功！');
        console.log('User:', user);
    } catch (error) {
        if (error.status === 429) {
            alert('註冊失敗：註冊請求過多，請稍後再試');
        } else {
            alert('註冊失敗：' + error.message);
        }
        console.log(error);
    }
});

// 新增登入功能
const signInForm = document.getElementById("sign-in-form");
signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;

    try {
        const { data, error } = await _supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        alert('登入成功！');
        console.log('User:', data.user);
    } catch (error) {
        if (error.status === 400 || error.status === 401) {
            alert('登入失敗：無效的登入憑證');
        } else {
            alert('登入失敗：' + error.message);
        }
        console.log(error);
    }
});
