type JwtToken = {
    exp: number;
}

type Good = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    goodId: number;
    userId: number;
    image: string;
}

export {
    JwtToken,
    Good
}