db = db.getSiblingDB('shop');

db.createUser({
    user: 'myUser',
    pwd: 'myUserPassword',
    roles: [{
        role: 'readWrite',
        db: 'shop',
    }],
});

db.createCollection("products");

db.products.insertMany([
    {
        name: "Apple MacBook Pro",
        price: 1499.99,
        description: "Apple MacBook Pro 13-inch model with 8-core CPU, 8-core GPU, 16GB unified memory, and 512GB SSD storage.",
    },
    {
        name: "Dell XPS 13",
        price: 1249.99,
        description: "Dell XPS 13-inch model with Intel 11th Gen i7, 16GB DDR4 memory, and 512GB SSD storage.",
    },
    {
        name: "Samsung Galaxy S21 Ultra",
        price: 999.99,
        description: "Samsung Galaxy S21 Ultra with 128GB storage, Phantom Black color.",
    },
    {
        name: "Apple iPhone 13 Pro",
        price: 999.99,
        description: "Apple iPhone 13 Pro with 128GB storage, Graphite color.",
    },
    {
        name: "Sony WH-1000XM4",
        price: 348.00,
        description: "Sony WH-1000XM4 Wireless Noise-Canceling Over-Ear Headphones, Black color.",
    },
]);