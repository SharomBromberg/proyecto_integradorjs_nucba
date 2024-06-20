import { productsInfo } from "../../assets/data/data";
import { createProduct } from "./create-product";
import { productsContainer } from "./elementsHTML"

const renderProducts = (productsList) => {

    productsContainer.innerHTML += productsList
        .map(createProduct)
        .join('');
}

export const productsInit = () => {

    renderProducts(productsInfo);
}