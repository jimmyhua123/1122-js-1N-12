import { _supabase } from "./clientSupabase_12.js";

// 現有產品相關的程式碼
let products_12 = [];
let cart = {};

const productContainer = document.querySelector(".products-container");
const companyBtns = document.querySelectorAll(".company-btn");
const cartContainer = document.getElementById("cart-container");
const cartItems = document.getElementById("cart-items");
const clearCartBtn = document.getElementById("clear-cart");
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutContainer = document.getElementById("checkout-container");
const checkoutItems = document.getElementById("checkout-items");
const checkoutForm = document.getElementById("checkout-form");
const totalAmount = document.getElementById("total-amount");
const cancelCheckoutBtn = document.getElementById("cancel-checkout");

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
    updateCartCount(); // 初始化購物車數量
});

// 新增 "Add to Cart" 功能
const addToCart = (product) => {
    const existingAlertBox = document.querySelector('.alert-box');
    if (existingAlertBox) {
        existingAlertBox.remove();
    }

    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = `Added ${product.title} to cart!`;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.opacity = '0';
        setTimeout(() => alertBox.remove(), 300);
    }, 3000); // 3秒後自動消失

    // 添加商品到購物車
    if (cart[product.title]) {
        cart[product.title].quantity += 1;
    } else {
        cart[product.title] = { ...product, quantity: 1 };
    }
    updateCart();
    updateCartCount(); // 更新購物車數量

    console.log(`Added ${product.title} to cart!`);
};

// 更新購物車顯示
const updateCart = () => {
    cartItems.innerHTML = Object.values(cart).map((item) => {
        return `
        <li class="cart-item">
            ${item.title} - $${item.price} x ${item.quantity}
            <div>
                <button class="decrease-btn" data-title="${item.title}">-</button>
                <button class="increase-btn" data-title="${item.title}">+</button>
            </div>
            <button class="remove-btn" data-title="${item.title}">Remove</button>
        </li>
        `;
    }).join("");
    
    const decreaseBtns = document.querySelectorAll('.decrease-btn');
    decreaseBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const title = e.target.dataset.title;
            decreaseQuantity(title);
        });
    });

    const increaseBtns = document.querySelectorAll('.increase-btn');
    increaseBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const title = e.target.dataset.title;
            increaseQuantity(title);
        });
    });

    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const title = e.target.dataset.title;
            removeFromCart(title);
        });
    });
};

// 增加商品數量
const increaseQuantity = (title) => {
    cart[title].quantity += 1;
    updateCart();
    updateCartCount();
};

// 減少商品數量
const decreaseQuantity = (title) => {
    if (cart[title].quantity > 1) {
        cart[title].quantity -= 1;
    } else {
        delete cart[title];
    }
    updateCart();
    updateCartCount();
};

// 移除購物車中的商品
const removeFromCart = (title) => {
    delete cart[title];
    updateCart();
    updateCartCount(); // 更新購物車數量
};

// 清空購物車
clearCartBtn.addEventListener("click", () => {
    cart = {};
    updateCart();
    updateCartCount(); // 更新購物車數量
});

// 顯示和隱藏購物車
cartBtn.addEventListener("click", () => {
    cartContainer.style.display = cartContainer.style.display === "none" || cartContainer.style.display === "" ? "block" : "none";
});

// 更新購物車商品數量
const updateCartCount = () => {
    cartCount.textContent = Object.keys(cart).reduce((total, key) => total + cart[key].quantity, 0);
};

// 顯示購買的商品資訊
const updateCheckoutItems = () => {
    checkoutItems.innerHTML = Object.values(cart).map((item) => {
        return `
        <li class="checkout-item">
            ${item.title} - $${item.price} x ${item.quantity}
        </li>
        `;
    }).join("");
};

// 添加結帳功能
checkoutBtn.addEventListener("click", () => {
    const totalPrice = Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0);
    totalAmount.textContent = `$${totalPrice}`;
    updateCheckoutItems();
    checkoutContainer.style.display = "block";
    cartContainer.style.display = "none";
});

// 提交結帳表單
checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("訂單已提交！");
    cart = {};
    updateCart();
    updateCartCount(); // 更新購物車數量
    checkoutContainer.style.display = "none";
});

// 取消結帳
cancelCheckoutBtn.addEventListener("click", () => {
    checkoutContainer.style.display = "none";
    cartContainer.style.display = "block";
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
    align-items: center;
    margin-bottom: 10px;
}

.cart-item div {
    display: flex;
    gap: 5px;
}

.decrease-btn, .increase-btn {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.decrease-btn:hover, .increase-btn:hover {
    background-color: #e0e0e0;
}

.remove-btn {
    background-color: #d32f2f;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.remove-btn:hover {
    background-color: #c62828;
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

.checkout-btn {
    background-color: #4CAF50; /* 綠色 */
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    text-align: center;
    margin-top: 10px;
}
.checkout-btn:hover {
    background-color: #45a049;
}

.checkout-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 1001;
}

.checkout-content {
    display: flex;
}

.checkout-products {
    width: 40%;
    margin-right: 20px;
}

.checkout-products h3 {
    margin-bottom: 10px;
}

.checkout-items {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.checkout-items li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.checkout-form {
    width: 60%;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.submit-btn, .cancel-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 48%;
    margin: 5px 1%;
    display: inline-block;
}

.cancel-btn {
    background-color: #d32f2f;
}

.submit-btn:hover {
    background-color: #45a049;
}

.cancel-btn:hover {
    background-color: #c62828;
}

.cart-btn {
    position: fixed;
    top: 10px;
    left: 100px; /* 避免和用戶信息重疊 */
    padding: 10px 20px;
    background-color: #ff6347; /* 番茄紅 */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.3s ease;
}

.cart-btn:hover {
    background-color: #ff4500; /* 橙紅色 */
}

#cart-count {
    background-color: #d32f2f;
    color: white;
    border-radius: 50%;
    padding: 2px 8px;
    margin-left: 10px;
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
