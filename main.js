
import { cartActionInit } from "./src/app/components/cart/cart";
import { menuInit } from "./src/app/components/header/menu";
import { productsSectionInit } from "./src/app/components/products/products"

const init = () => {
    productsSectionInit();
    menuInit();
    cartActionInit()
}

init();