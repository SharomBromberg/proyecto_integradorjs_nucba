const menuButton = document.querySelector('.toggle-menu');
const barsMenu = document.querySelector('.navlist');
const overlay = document.querySelector('.overlay');
const cartButton = document.querySelector('.toggle-cart');
const cartMenu = document.querySelector('.cart-box');

const toggleMenu = () => {
    barsMenu.classList.toggle('active-menu');
    if (cartMenu.classList.contains('active-cart')) {
        cartMenu.classList.remove('active-cart');
        return;
    }
    overlay.classList.toggle('active-overlay');

}

const toggleCart = () => {
    cartMenu.classList.toggle('active-cart');
    if (barsMenu.classList.contains('active-menu')) {
        barsMenu.classList.remove('active-menu');
        return;
    }
    overlay.classList.toggle('active-overlay');
}

const closeOnClick = (e) => {
    if (!e.target.classList.contains('link')) return;
    barsMenu.classList.remove('active-menu');
    overlay.classList.remove('active-overlay');
}