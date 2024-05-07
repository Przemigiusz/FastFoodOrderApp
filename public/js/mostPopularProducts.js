import cache from '../js/cache.js';
import { addProduct } from './cart.js';

function createOfferItem(product, productType, burgersItems, pizzasItems) {
    let offerItem = document.createElement('div');
    let img = document.createElement('img');
    let title = document.createElement('h3');
    let description = document.createElement('p');
    let addToCart = document.createElement('div');
    let price = document.createElement('p');
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    offerItem.className = 'menu-tab-item';
    img.src = product.image;
    img.alt = `${product.name} Image`;
    title.textContent = product.name;
    description.textContent = product.description;
    addToCart.className = 'add-to-cart';
    price.className = 'price';
    price.textContent = `$${product.price}`;
    svg.setAttribute('viewBox', '0 0 448 512');
    path.setAttribute('d', 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z');

    offerItem.appendChild(img);
    offerItem.appendChild(title);
    offerItem.appendChild(description);
    addToCart.appendChild(price);
    svg.appendChild(path);
    addToCart.appendChild(svg);
    offerItem.appendChild(addToCart);

    svg.addEventListener('click', () => {
        addProduct(product.id, productType);
    });

    if (productType === 'burger') {
        burgersItems.appendChild(offerItem);
    } else if (productType === 'pizza') {
        pizzasItems.appendChild(offerItem);
    }
}

export default function setTopThreeProducts() {
    cache.fetchOffer().then(offer => {
        let burgers = offer.burgers;
        let pizzas = offer.pizzas;

        let top3Burgers = burgers.sort((a, b) => b.purchased_quantity - a.purchased_quantity).slice(0, 3);
        let top3Pizzas = pizzas.sort((a, b) => b.purchased_quantity - a.purchased_quantity).slice(0, 3);

        let mostPopularBurgers = document.getElementById('burgers');
        let mostPopularPizzas = document.getElementById('pizzas');

        let burgersItems = document.createElement('div');
        let pizzasItems = document.createElement('div');

        burgersItems.className = 'menu-tab-items';
        pizzasItems.className = 'menu-tab-items';

        mostPopularBurgers.appendChild(burgersItems);
        mostPopularPizzas.appendChild(pizzasItems);

        top3Burgers.forEach(burger => {
            createOfferItem(burger, 'burger', burgersItems, pizzasItems);
        });

        top3Pizzas.forEach(pizza => {
            createOfferItem(pizza, 'pizza', burgersItems, pizzasItems);
        });
    }).catch(error => console.error('Error:', error));
}



