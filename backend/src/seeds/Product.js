const {faker} = require('@faker-js/faker');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const generateProductSeed = (quantity) => {
    const products = [];

    for (let i = 0; i < quantity; i++) {
        const product = {
            brand: faker.commerce.department(),
            category: faker.commerce.product(),
            subCategory: "check",
            productName: faker.commerce.productName(),
            title: "white-strips-shirt",
            color: "white",
            productPrice: faker.commerce.price(),
            productSpecification: lorem.generateSentences(5),
            fabric: "100% cotton",
            fitType: "slim-fit",
            washCare: "gentle wash",
            otherDescription: "decide later",
            // imagesId: faker.image.imageUrl(500, 500, 'product'),
            imagesId:`https://picsum.photos/${Math.floor(Math.random() * (601 - 500) + 500)}/${Math.floor(Math.random() * (601 - 500) + 500)}?random=1`,
            sizeSet: [
                { name: "S", value: "30", quantity: 2 },
                { name: "M", value: "32", quantity: 2 },
                { name: "XL", value: "36", quantity: 2 },
                { name: "XS", value: "28", quantity: 2 },
                { name: "L", value: "34", quantity: 2 }
            ],
        };

        products.push(product);
    }

    return products;
};

module.exports = generateProductSeed;
