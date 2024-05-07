export function initializeCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || "";
    const itemsInCart = document.getElementsByClassName('items-in-cart')[0];
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
        itemsInCart.innerText = '0';
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
            console.log(`Product with id: ${productId} from ${category} category already in cart`);
        } else {
            cart.push({ id: productId, category: category, quantity: 1 });
            console.log(`Product with id: ${productId} from ${category} category added to cart`);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        const itemsInCart = document.getElementsByClassName('items-in-cart')[0];
        const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
        itemsInCart.innerText = `${totalQuantity}`;
    }
}

export function removeProduct(productId, category) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        const foundProductIndex = cart.findIndex(product => product.id === productId && product.category === category);
        if (foundProductIndex !== -1) {
            if (cart[foundProductIndex].quantity > 1) {
                cart[foundProductIndex].quantity -= 1;
            } else {
                cart.splice(foundProductIndex, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            const itemsInCart = document.getElementsByClassName('items-in-cart')[0];
            const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
            itemsInCart.innerText = `${totalQuantity}`;
            console.log(`Product with id: ${productId} from ${category} category removed from cart`);
        } else {
            console.log(`Product with id: ${productId} from ${category} category not found in cart`);
        }
    }
}