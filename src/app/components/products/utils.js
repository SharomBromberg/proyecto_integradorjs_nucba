import { appState } from "../../assets/data/data"

export const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
}