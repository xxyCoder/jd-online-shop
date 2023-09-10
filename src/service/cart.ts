import axios from './index';

const token = localStorage.getItem('token');

export function addToCart(goodName: string, quantity: number) {
    axios.post("/carts/add", {
        goodName,
        quantity
    }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export function getAllGoodFromCart() {
    return axios.get("/carts/all");
}

export function removeFromCart(goodName: string, quantity: number) {
    axios.post("/carts/delete", {
        goodName,
        quantity
    }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}