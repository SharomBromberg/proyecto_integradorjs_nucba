const menuButton = document.querySelector('.toggle-menu');
const barsMenu = document.querySelector('.navitems');
const overlay = document.querySelector('.overlay');
const cartButton = document.querySelector('.toggle-cart');
const cartMenu = document.querySelector('.cart');

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

const closeOnScroll = () => {
    if (
        !barsMenu.classList.contains('active-menu')
        && !cartMenu.classList.contains('active-cart')
    )
        return;
    barsMenu.classList.remove('active-menu');
    cartMenu.classList.remove('active-cart');
    overlay.classList.remove('active-overlay');
}

const closeOnOverlayClick = () => {
    barsMenu.classList.remove('active-menu');
    cartMenu.classList.remove('active-cart');
    overlay.classList.remove('active-overlay');

}

export const menuInit = () => {
    menuButton.addEventListener('click', toggleMenu);
    cartButton.addEventListener('click', toggleCart);
    overlay.addEventListener('click', closeOnClick);
    window.addEventListener('scroll', closeOnScroll);
    barsMenu.addEventListener('click', closeOnClick);
    overlay.addEventListener('click', closeOnOverlayClick);
}