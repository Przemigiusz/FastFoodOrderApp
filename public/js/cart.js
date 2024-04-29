function addToCart(product, quantity, price) {
    const existingProductIndex = cart.findIndex(p => p.product === product);
    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Dodaj nowy produkt do koszyka
        cart.push({ product, quantity, price });
    }
}

function removeFromCart(product) {
    cart = cart.filter(p => p.product !== product);
}

function displayCart() {
    console.log("Cart contents:");
    cart.forEach(item => console.log(`${item.product}: ${item.quantity} x ${item.price}$`));
    console.log(`Total: ${calculateTotal()}$`);
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
}

// Użycie
addToCart("Apple", 2, 0.5);
addToCart("Banana", 1, 0.3);
addToCart("Apple", 2, 0.5);
displayCart();
removeFromCart("Apple");
displayCart();