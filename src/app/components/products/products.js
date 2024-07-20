import {
    productsContainer,
    categoriesContainer,
    categoriesList,
    buttonMore,
    brandsContainer,
} from "./elementsHTML";
import { isLastIndexOf } from "./utils";
import { createProductTemplate } from "./createProductTemplate";
import { appState, productsInfo } from "../../assets/data/data";
import { addProduct } from "../cart/cart";

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
        .map(createProductTemplate)
        .join("");
};

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        buttonMore.classList.add("hidden");
    }
};

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    });
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisibility(appState.activeFilter);
};

const applyFilter = ({ target }) => {
    if (!isInactiveFilterBtn(target)) return;
    changeFilterState(target);
    productsContainer.innerHTML = "";
    if (appState.activeFilter) {
        renderFilteredProducts();
        showBrandsForCategory();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};

const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") &&
        !element.classList.contains("active")
    );
};

const renderFilteredProducts = () => {
    const filteredProducts = productsInfo.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
};

const showBrandsForCategory = () => {
    const activeCategory = appState.activeFilter;
    const brands = new Set(
        productsInfo.filter(
            (product) => product.category === activeCategory
        ).map((product) => product.brand)
    );

    brandsContainer.innerHTML = "";
    const brandsSelect = document.createElement("select");
    brandsSelect.id = "brands-select";

    const filterLabel = document.createElement("label");
    filterLabel.setAttribute("for", "brands-select");
    filterLabel.textContent = "Filter by brand: ";

    brandsContainer.appendChild(filterLabel);

    const allBrandsOption = document.createElement("option");
    allBrandsOption.value = "";
    allBrandsOption.textContent = "All brands";
    brandsSelect.appendChild(allBrandsOption);

    brands.forEach((brand) => {
        const brandOption = document.createElement("option");
        brandOption.value = brand;
        brandOption.textContent = brand;
        brandsSelect.appendChild(brandOption);
    });

    brandsSelect.addEventListener("change", () => {
        filterProductsByBrand(brandsSelect.value);
    });

    brandsContainer.appendChild(brandsSelect);
};

const filterProductsByBrand = (brand) => {
    let filteredProducts;
    if (!brand) {
        filteredProducts = productsInfo.filter(
            (product) => product.category === appState.activeFilter
        );
    } else {
        filteredProducts = productsInfo.filter(
            (product) =>
                product.category === appState.activeFilter &&
                product.brand === brand
        );
    }
    productsContainer.innerHTML = "";
    renderProducts(filteredProducts);
};

const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        buttonMore.classList.remove("hidden");
        return;
    }
    buttonMore.classList.add("hidden");
};

export const productsSectionInit = () => {
    renderProducts(appState.products[0]);
    buttonMore.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);
    productsContainer.addEventListener("click", addProduct);
};