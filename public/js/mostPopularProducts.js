import cache from '../js/cache.js';
import { addProduct } from './cart.js';

class MenuTabItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const product = JSON.parse(this.getAttribute('product'));
        const productType = this.getAttribute('productType');

        const template = document.getElementById('menu-tab-item-template');
        const node = document.importNode(template.content, true);

        node.querySelector('img').src = product.image;
        node.querySelector('img').alt = `${product.name} Image`;
        node.querySelector('h3').textContent = product.name;
        node.querySelector('p').textContent = product.description;
        node.querySelector('.price').textContent = `$${product.price}`;

        node.querySelector('svg').addEventListener('click', () => {
            addProduct(product.id, productType);
        });

        this.appendChild(node);
    }
}

customElements.define('menu-tab-item', MenuTabItem);

export default function setTopThreeProducts() {
    cache.fetchOffer().then(offer => {
        const burgers = offer.burgers;
        const pizzas = offer.pizzas;

        const top3Burgers = burgers.sort((a, b) => b.purchased_quantity - a.purchased_quantity).slice(0, 3);
        const top3Pizzas = pizzas.sort((a, b) => b.purchased_quantity - a.purchased_quantity).slice(0, 3);

        const mostPopularBurgers = document.getElementById('burgers');
        const mostPopularPizzas = document.getElementById('pizzas');

        const burgersItems = document.createElement('div');
        const pizzasItems = document.createElement('div');

        burgersItems.className = 'menu-tab-items';
        pizzasItems.className = 'menu-tab-items';

        mostPopularBurgers.appendChild(burgersItems);
        mostPopularPizzas.appendChild(pizzasItems);

        top3Burgers.forEach(burger => {
            const menuTabItem = document.createElement('menu-tab-item');
            menuTabItem.setAttribute('product', JSON.stringify(burger));
            menuTabItem.setAttribute('productType', 'burger');
            burgersItems.appendChild(menuTabItem);
        });

        top3Pizzas.forEach(pizza => {
            const menuTabItem = document.createElement('menu-tab-item');
            menuTabItem.setAttribute('product', JSON.stringify(pizza));
            menuTabItem.setAttribute('productType', 'pizza');
            pizzasItems.appendChild(menuTabItem);
        });
    }).catch(error => console.error('Error:', error));
}



