import cache from '../js/cache.js';
import { addProduct } from './cart.js';

function createOfferItem(product, productType, offerItemsBurgers, offerItemsPizzas) {
    const offerItem = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const addToCart = document.createElement('div');
    const price = document.createElement('p');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    offerItem.className = 'offer-item';
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
        offerItemsBurgers.appendChild(offerItem);
    } else if (productType === 'pizza') {
        offerItemsPizzas.appendChild(offerItem);
    }
}

export default function setOffer() {
    cache.fetchOffer().then(offer => {
        const burgers = offer.burgers;
        const pizzas = offer.pizzas;

        const offerDiv = document.getElementsByClassName('offer')[0];

        const categoryBurgers = document.createElement('div');
        const categoryPizzas = document.createElement('div');

        categoryBurgers.className = 'category';
        categoryPizzas.className = 'category';

        const titleBurgers = document.createElement('h2');
        const titlePizzas = document.createElement('h2');

        titleBurgers.textContent = 'Burgers';
        titlePizzas.textContent = 'Pizzas';

        const offerItemsBurgers = document.createElement('div');
        const offerItemsPizzas = document.createElement('div');

        offerItemsBurgers.className = 'offer-items';
        offerItemsPizzas.className = 'offer-items';

        offerDiv.appendChild(categoryBurgers);
        offerDiv.appendChild(categoryPizzas);

        categoryBurgers.appendChild(titleBurgers);
        categoryBurgers.appendChild(offerItemsBurgers);

        categoryPizzas.appendChild(titlePizzas);
        categoryPizzas.appendChild(offerItemsPizzas);

        burgers.forEach(burger => {
            createOfferItem(burger, 'burger', offerItemsBurgers, offerItemsPizzas);
        });

        pizzas.forEach(pizza => {
            createOfferItem(pizza, 'pizza', offerItemsBurgers, offerItemsPizzas);
        });
    }).catch(error => console.error('Error:', error));
}



