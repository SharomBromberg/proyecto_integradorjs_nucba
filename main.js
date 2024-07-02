import { menuInit } from "./src/app/components/header/menu";
import { productsInit } from "./src/app/components/products/products"

const init = () => {
    productsInit();
    menuInit();
}

init();