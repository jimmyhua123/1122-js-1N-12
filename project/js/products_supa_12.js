import { _supabase } from "./clientSupabase_12.js";

// 現有產品相關的程式碼
let products_12 = [];
let cart = [];

const productContainer = document.querySelector(".products-container");
const companyBtns = document.querySelectorAll(".company-btn");
const cartContainer = document.getElementById("cart-container");
const cartItems = document.getElementById("cart-items");
const clearCartBtn = document.getElementById("clear-cart");
const cartBtn = document.getElementById("cart-btn");

const displayProducts = (products) => {
    let productsContent = products.map((product) => {
        const { title, price, remoteImg } = product;
        return `
        <div class="single-product">
            <img src=${remoteImg} class="single-product-img img" alt=${title} />
            <footer>
              <h3 class="name">${title}</h3>
              <span class="price">$${price}</span>
              <button class="add-to-cart-btn">Add to Cart</button>
            </footer>
          </div>
        `;
    }).join("");
    productContainer.innerHTML = productsContent;

    // 為每個 "Add to Cart" 按鈕添加事件監聽器
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            addToCart(products[index]);
        });
    });
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

// 新增 "Add to Cart" 功能
const addToCart = (product) => {
    // 移除現有的提示框
    const existingAlertBox = document.querySelector('.alert-box');
    if (existingAlertBox) {
        existingAlertBox.remove();
    }

    // 創建新的提示框元素
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = `Added ${product.title} to cart!`;

    // 將提示框元素添加到 body
    document.body.appendChild(alertBox);

    // 設置定時器，自動移除提示框
    setTimeout(() => {
        alertBox.style.opacity = '0';
        setTimeout(() => alertBox.remove(), 300);
    }, 3000); // 3秒後自動消失

    // 添加商品到購物車
    cart.push(product);
    updateCart();

    console.log(`Added ${product.title} to cart!`);
};

// 更新購物車顯示
const updateCart = () => {
    cartItems.innerHTML = cart.map((item, index) => {
        return `
        <li class="cart-item">
            ${item.title} - $${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
        </li>
        `;
    }).join("");
    cartContainer.style.display = cart.length > 0 ? "block" : "none";
};

// 移除購物車中的商品
const removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

// 清空購物車
clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
});

// 顯示和隱藏購物車
cartBtn.addEventListener("click", () => {
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
});

// 添加 CSS 樣式
const style = document.createElement('style');
style.innerHTML = `
.alert-box {
    position: fixed;
    top: 60px;
    left: 10px;
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease-in-out;
}
.cart-container {
    position: fixed;
    top: 100px;
    right: 10px;
    width: 300px;
    max-height: 400px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    z-index: 1000;
    padding: 20px;
    display: none;
}
.cart-items {
    list-style-type: none;
    padding: 0;
}
.cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.clear-cart-btn {
    background-color: #d32f2f;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    text-align: center;
}
.clear-cart-btn:hover {
    background-color: #c62828;
}
`;
document.head.appendChild(style);

// 登入和註冊表單的顯示/隱藏邏輯
const loginBtn = document.getElementById("login-btn");
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const signInBtn = document.getElementById("login");
const signInCloseBtn = document.getElementById("sign-in-close-btn");
const signUpCloseBtn = document.getElementById("sign-up-close-btn");
const userInfo = document.getElementById("user-info");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("logout-btn");

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

        // 顯示用戶信息
        userInfo.style.display = "flex";
        welcomeMessage.textContent = `歡迎回來, ${data.user.email}`;
        loginBtn.style.display = "none";
        container.style.display = "none";
    } catch (error) {
        if (error.status === 400 || error.status === 401) {
            alert('登入失敗：無效的登入憑證');
        } else {
            alert('登入失敗：' + error.message);
        }
        console.log(error);
    }
});

// 新增登出功能
logoutBtn.addEventListener("click", async () => {
    const { error } = await _supabase.auth.signOut();
    if (error) {
        console.log("登出失敗：", error.message);
    } else {
        alert("已登出！");
        userInfo.style.display = "none";
        loginBtn.style.display = "block";
    }
});
