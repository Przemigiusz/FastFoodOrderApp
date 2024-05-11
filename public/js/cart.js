import cache from '../js/cache.js';

export function initializeCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || "";
    const itemsInCart = document.getElementsByClassName('items-in-cart')[0];
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
        itemsInCart.innerText = 0;
    } else {
        const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
        itemsInCart.innerText = `${totalQuantity}`;
    }
}

// Product In Cart Info
// Example: {id: 1, category: 'burger', quantity: 2}
export function addProduct(productId, category) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        const foundProduct = cart.find(product => product.id === productId && product.category === category);
        if (foundProduct) {
            foundProduct.quantity += 1;
        } else {
            cart.push({ id: productId, category: category, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        const itemsInCart = document.getElementsByClassName('items-in-cart')[0];
        const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
        itemsInCart.innerText = `${totalQuantity}`;
    }
}

export function removeProduct(productId, category, completeRemoval = false) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        const foundProductIndex = cart.findIndex(product => product.id === productId && product.category === category);
        if (foundProductIndex !== -1) {
            if (!completeRemoval && cart[foundProductIndex].quantity > 1) {
                cart[foundProductIndex].quantity -= 1;
            } else {
                cart.splice(foundProductIndex, 1);
                completeRemoval = true;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            const itemsInCart = document.getElementsByClassName('items-in-cart')[0];
            const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
            itemsInCart.innerText = `${totalQuantity}`;
        }
    }
    return completeRemoval;
}

async function calculateSubtotal() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let subtotal = 0;
    if (cart) {
        const offer = await cache.fetchOffer();
        const burgers = offer.burgers;
        const pizzas = offer.pizzas;

        cart.forEach(item => {
            let cachedItem;
            if (item.category === 'burger') {
                cachedItem = burgers.find(burger => item.id === burger.id);
            } else if (item.category === 'pizza') {
                cachedItem = pizzas.find(pizza => item.id === pizza.id);
            }
            item.price = cachedItem.price;
        });

        subtotal = cart.reduce((sum, product) => sum + product.quantity * product.price, 0);
    }
    return subtotal.toFixed(2);
}

function calculateDelivery(subtotal) {
    const parsedSubtotal = parseFloat(subtotal);
    const delivery = (parsedSubtotal > 50 || parsedSubtotal === 0) ? 0 : 5;
    return delivery.toFixed(2);
}

async function setOrderSummary() {
    const summarySubtotalCost = document.querySelector('.cart-summary-subtotal-cost');
    const summaryDeliveryCost = document.querySelector('.cart-summary-delivery-cost');
    const summaryTotalCost = document.querySelector('.cart-summary-total-cost');

    const subtotal = await calculateSubtotal();
    const delivery = calculateDelivery(subtotal);

    Promise.all([subtotal, delivery]).then(([subtotal, delivery]) => {
        summarySubtotalCost.textContent = `$${subtotal}`;
        summaryDeliveryCost.textContent = `$${delivery}`;
        summaryTotalCost.textContent = `$${(parseFloat(subtotal) + parseFloat(delivery)).toFixed(2)}`;
    });
}

function createCartItem(item, cachedItem, cartList) {
    const cartListItem = document.createElement('li');
    cartListItem.className = 'cart-list-item';

    const img = document.createElement('img');
    img.src = cachedItem.image;
    img.alt = 'product';
    cartListItem.appendChild(img);

    const cartItemInfo = document.createElement('div');
    cartItemInfo.className = 'cart-item-info';

    const name = document.createElement('h3');
    name.textContent = cachedItem.name;
    cartItemInfo.appendChild(name);

    const pricePerProduct = document.createElement('p');
    pricePerProduct.innerHTML = `Price Per Product: <span class="cart-item-price-val">$${cachedItem.price}</span>`;
    cartItemInfo.appendChild(pricePerProduct);

    const cartItemQuantityContainer = document.createElement('div');
    cartItemQuantityContainer.className = 'cart-item-quantity-container';

    const minusButton = document.createElement('button');
    const minusSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const minusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    minusSvg.setAttribute('viewBox', '0 0 448 512');
    minusPath.setAttribute('d', 'M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z');
    minusSvg.appendChild(minusPath);
    minusButton.appendChild(minusSvg);
    cartItemQuantityContainer.appendChild(minusButton);

    const quantity = document.createElement('span');
    quantity.className = 'cart-item-quantity';
    quantity.textContent = item.quantity;
    cartItemQuantityContainer.appendChild(quantity);

    const plusButton = document.createElement('button');
    const plusSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const plusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    plusSvg.setAttribute('viewBox', '0 0 448 512');
    plusPath.setAttribute('d', 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z');
    plusSvg.appendChild(plusPath);
    plusButton.appendChild(plusSvg);
    cartItemQuantityContainer.appendChild(plusButton);

    cartItemInfo.appendChild(cartItemQuantityContainer);

    const total = document.createElement('p');
    total.innerHTML = `Total: <span class="cart-item-total-val">$${(parseFloat(cachedItem.price) * parseInt(item.quantity)).toFixed(2)}</span>`;
    cartItemInfo.appendChild(total);

    cartListItem.appendChild(cartItemInfo);

    const deleteProductBtn = document.createElement('button');
    deleteProductBtn.className = 'delete-product-btn';
    const deleteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const deletePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    deleteSvg.setAttribute('viewBox', '0 0 384 512');
    deletePath.setAttribute('d', 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z');
    deleteSvg.appendChild(deletePath);
    deleteProductBtn.appendChild(deleteSvg);
    cartListItem.appendChild(deleteProductBtn);

    cartList.appendChild(cartListItem);

    setOrderSummary();

    deleteProductBtn.addEventListener('click', () => {
        removeProduct(item.id, item.category, true);
        cartList.removeChild(cartListItem);

        setOrderSummary();
    });

    plusButton.addEventListener('click', () => {
        addProduct(item.id, item.category);
        const updatedCart = JSON.parse(localStorage.getItem('cart'));
        const updatedItem = updatedCart.find(product => product.id === item.id && product.category === item.category);
        quantity.textContent = updatedItem.quantity;
        total.querySelector('.cart-item-total-val').textContent = `$${(parseFloat(cachedItem.price) * parseInt(updatedItem.quantity)).toFixed(2)}`;

        setOrderSummary();
    });

    minusButton.addEventListener('click', () => {
        const completeRemoval = removeProduct(item.id, item.category);
        const updatedCart = JSON.parse(localStorage.getItem('cart'));
        const updatedItem = updatedCart.find(product => product.id === item.id && product.category === item.category);
        if (updatedItem) {
            quantity.textContent = updatedItem.quantity;
            total.querySelector('.cart-item-total-val').textContent = `$${(parseFloat(cachedItem.price) * parseInt(updatedItem.quantity)).toFixed(2)}`;
        }
        if (completeRemoval) {
            cartList.removeChild(cartListItem);
        }

        setOrderSummary();
    });
}

export function setCartItems() {
    cache.fetchOffer().then(offer => {
        const burgers = offer.burgers;
        const pizzas = offer.pizzas;

        const cartList = document.querySelector('.cart .cart-list')

        const cart = JSON.parse(localStorage.getItem('cart'));

        if (cart.length === 0) {
            const cartSection = document.querySelector('section.cart');
            cartSection.style.gap = '0';
        }

        cart.forEach(item => {
            let cachedItem;
            if (item.category === 'burger') {
                cachedItem = burgers.find(burger => item.id === burger.id);
            } else if (item.category === 'pizza') {
                cachedItem = pizzas.find(pizza => item.id === pizza.id);
            }
            createCartItem(item, cachedItem, cartList);
        })
    })
}

