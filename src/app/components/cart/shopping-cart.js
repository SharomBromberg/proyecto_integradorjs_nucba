let cart = JSON.parse(localStorage.getItem('cart-box')) || [];

const productsInCart = document.querySelector('.cart-items');

const cartTotal = document.querySelector('.value');

const cartBubble = document.querySelector('.cart-bubble');

const deleteButton = document.querySelector('.delete');

const buyButton = document.querySelector('.buy');