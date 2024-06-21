//create-product.js

export const createProduct = (product) => {
    const { name, imageURL, price, brand, id } = product
    return `
    <div class="product">
      <div class="img-container">
        <img src=${imageURL} alt=${name} />
      </div>
      <div class="product-info">
        <h2>${brand}</h2>
        <h3>${name}</h3>
      </div>

      <span>${price} USD</span>

      <div class="product-actions">
        <button class="button-add" data-id="${id}" data-brand="${brand}" data-name="${name}" data-price="${price}"
          data-imageURL="${imageURL}">Añadir al carrito</button>
      </div>
    </div>

    `;
}
