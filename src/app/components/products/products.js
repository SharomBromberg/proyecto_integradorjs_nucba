import { appState, productsInfo } from "../../assets/data/data";
import { createProduct } from "./create-product";
import { brandsContainer, buttonMore, categoriesContainer, categoriesList, productsContainer } from "./elementsHTML"
import { isLastIndexOf } from "./utils";


const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
        .map(createProduct)
        .join('');
}

const renderProductsByfilter = () => {
    const filteredProducts = productsInfo.filter((product) => product.category === appState.activeFilter);
    // Limitar a los primeros 4 productos
    const limitedProducts = filteredProducts.slice(0, 4);
    renderProducts(limitedProducts);
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
    brandsContainer.innerHTML = '';
    if (appState.activeFilter) {
        renderProductsByfilter();
        showBrandsForCategory();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};

const showBrandsForCategory = () => {
    const activeCategory = appState.activeFilter;
    const brands = new Set(productsInfo.filter(product => product.category === activeCategory).map(product => product.brand));

    brandsContainer.innerHTML = '';
    const brandsSelect = document.createElement('select');
    brandsSelect.id = 'brands-select';

    // Crear el elemento label y configurarlo
    const filterLabel = document.createElement('label');
    filterLabel.setAttribute('for', 'brands-select');
    filterLabel.textContent = 'Filtrar por marca: ';

    // Agregar el label al contenedor antes del select
    brandsContainer.appendChild(filterLabel);

    const allBrandsOption = document.createElement('option');
    allBrandsOption.value = '';
    allBrandsOption.textContent = 'Todas las marcas';
    brandsSelect.appendChild(allBrandsOption);

    brands.forEach(brand => {
        const brandOption = document.createElement('option');
        brandOption.value = brand;
        brandOption.textContent = brand;
        brandsSelect.appendChild(brandOption);
    });

    brandsSelect.addEventListener('change', () => {
        filterProductsByBrand(brandsSelect.value);
    });

    brandsContainer.appendChild(brandsSelect);
};

const filterProductsByBrand = (brand) => {
    let filteredProducts;
    if (!brand) {
        filteredProducts = productsInfo.filter(product => product.category === appState.activeFilter);
    } else {
        filteredProducts = productsInfo.filter(product => product.category === appState.activeFilter && product.brand === brand);
    }
    productsContainer.innerHTML = '';
    renderProducts(filteredProducts);
};

const isInactiveButton = (element) => {
    return (element.classList.contains("category") && !element.classList.contains("active"))
}

const changeFilter = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeButtonActiveState(appState.activeFilter);
}

const buttonMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) { //utils.js
        buttonMore.classList.add('hidden');
    }
}

export const productsInit = () => {
    renderProducts(appState.products[0]);
    categoriesContainer.addEventListener("click", filterByCategory);
    buttonMore.addEventListener("click", buttonMoreProducts);

}