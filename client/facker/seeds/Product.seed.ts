import {faker} from '@faker-js/faker'
export const  productSeed= ()=>(
    {
            "brand": faker.commerce.department(),
            "category": faker.commerce.product(),
            "subCategory": "check",
            "productName": faker.commerce.productName(),
            "title": "white-strips-shirt",
            "color": "white",
            "productPrice": faker.commerce.price(),
            "productSpecification": "will decide later",
            "fabric": "100% cotton",
            "fitType": "slim-fit",
            "washCare": "gentle wash",
            "otherDescription": "decide later",
            "imagesId": faker.image.imageUrl(500,500,'product'),
             "sizeSet": [
                {
                    "name": "S",
                    "value": "30",
                    "quantity": 2
                },
                {
                    "name": "M",
                    "value": "32",
                    "quantity": 2
                },
                {
                    "name": "XL",
                    "value": "36",
                    "quantity": 2
                },
                {
                    "name": "XS",
                    "value": "28",
                    "quantity": 2
                },
                {
                    "name": "L",
                    "value": "34",
                    "quantity": 2
                }
            ],
            
}
)