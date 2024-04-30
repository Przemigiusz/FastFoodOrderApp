export default {
    offer: {},

    fetchOffer: function () {
        if (Object.keys(this.offer).length === 0) {
            return Promise.all([
                fetch('http://localhost:3000/burgers').then(response => response.json()),
                fetch('http://localhost:3000/pizzas').then(response => response.json())
            ]).then(([burgersData, pizzasData]) => {
                this.offer.burgers = burgersData;
                this.offer.pizzas = pizzasData;
                return this.offer;
            }).catch(error => console.error('Error:', error));
        } else {
            return Promise.resolve(this.offer).catch(error => console.error('Error:', error));;
        }
    }
}