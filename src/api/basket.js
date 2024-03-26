import { ENV } from '@/utils';
import { forEach } from 'lodash';

function getAll() {
    const response = localStorage.getItem(ENV.BASKET);

    if (!response) {
        return [];
    } else {
        return JSON.parse(response);
    }
}

function add(productId) {
    const products = getAll();
    const productIndex = products.findIndex((product) => product.id === productId);

    if (productIndex < 0) {
        products.push({ id: productId, quantity: 1 });
    } else {
        const product = products[productIndex];
        products[productIndex].quantity = product.quantity + 1;
    }

    localStorage.setItem(ENV.BASKET, JSON.stringify(products));
}

function count() {
    const response = getAll();
    let countTemp = 0;

    forEach(response, (item) => {
        countTemp += item.quantity;
    });
    
    return countTemp;
}

export const  basketContrll = {
    getAll,
    add,
    count,
}; 