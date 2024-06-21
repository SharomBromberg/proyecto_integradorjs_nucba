import { appState, productsInfo } from "../../assets/data/data";
import { createProduct } from "./create-product";
import { categoriesContainer, categoriesList, productsContainer } from "./elementsHTML"

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
        .map(createProduct)
        .join('');
}
const renderProductsByfilter = () => {
    const filteredProduts = productsInfo.filter((product) => product.category === appState.activeFilter);
    renderProducts(filteredProduts);
};

const changeButtonActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    });
};
const filterByCategory = ({ target }) => {
    if (!isInactiveButton(target)) return;
    changeFilter(target);
    productsContainer.innerHTML = '';
    if (appState.activeFilter) {
        renderProductsByfilter();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};

const isInactiveButton = (element) => {
    return (element.classList.contains("category") && !element.classList.contains("active"))
}

const changeFilter = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeButtonActiveState(appState.activeFilter);
}




export const productsInit = () => {
    renderProducts(appState.products[0]);
    categoriesContainer.addEventListener("click", filterByCategory);

}