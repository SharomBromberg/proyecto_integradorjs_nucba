let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const buyBtn = document.querySelector(".btn-buy");
const cartBubble = document.querySelector(".cart-bubble");
const deleteBtn = document.querySelector(".btn-delete");
const successModal = document.querySelector(".add-modal");

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};


const createCartProductTemplate = (cartProduct) => {
    const { id, name, price, img, quantity } = cartProduct;
    return `
    <div class="cart-item">
      <img src=${img} alt="Nft del carrito" />
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <p>Price</p>
        <span class="item-price">${price} USD</span>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>`;
};


const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};


const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
};


const showCartTotal = () => {
    total.innerHTML = `${getCartTotal().toFixed(2)} USD`;
};


const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};


const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add("disabled");
    } else {
        btn.classList.remove("disabled");
    }
};


const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble();
};


export const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) return;
    const product = createProductData(e.target.dataset);
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product);
        showSuccessModal("Se agregó una unidad del producto al carrito");
    } else {
        createCartProduct(product);
        showSuccessModal("El producto se ha agregado al carrito");
    }

    updateCartState();
};


const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) =>
        cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
    );
};


const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
};


const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
};


const createProductData = (product) => {
    const { id, name, price, img } = product;
    return { id, name, price, img };
};


const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove("active-modal");
    }, 1500);
};


const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct);
};


const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);


    if (existingCartProduct.quantity === 1) {
        if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
            removeProductFromCart(existingCartProduct);
        }
        return;
    }
    substractProductUnit(existingCartProduct);
};


const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id
            ? { ...product, quantity: Number(product.quantity) - 1 }
            : product;
    });
};


const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    updateCartState();
};


const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
        handlePlusBtnEvent(e.target.dataset.id);
    }

    updateCartState();
};


const resetCartItems = () => {
    cart = [];
    updateCartState();
};


const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
    }
};


const completeBuy = () => {
    completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};


const deleteCart = () => {
    completeCartAction(
        "¿Desea vaciar el carrito?",
        "No hay productos en el carrito"
    );
};

export const cartActionInit = () => {
    productsCart.addEventListener("click", handleQuantity);
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble(cart);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
};
