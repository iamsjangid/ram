const slugify = require("slugify")
const string = `Amazon Brand - Symbol Men's Cotton Solid Long Kurta (Regular Fit)`


const SlugFn = (text)=>{
    return slugify(text,{
         replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: false,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi',      // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`

    })
}

console.log(SlugFn(string))
console.log(SlugFn(string))
console.log(SlugFn(string))
console.log(SlugFn(string))
console.log(SlugFn(string))
console.log(SlugFn(string))




// {
//   _id: new ObjectId('65fef0c37117e8ce80e0dc30'),
//   order_id: {
//     total_amount: 9399,
//     products: [ [Object], [Object] ],
//     shipping_details: {
//       name: 'krishna',
//       email: 'harish@gmail.com',
//       address: 'gita nagar ,delhi',
//       _id: new ObjectId('65fef0c37117e8ce80e0dc2d'),
//       date: 2024-03-23T15:09:55.909Z
//     },
//     payment_details: { order_id: 'order_NpqCy7LhLLIEv3' }
//   },
//   user: { name: 'krishna' },
//   status: 'PENDING',
//   paymentType: 'ONLINE',
//   isPayment: true,
//   order_date: 2024-03-23T15:09:55.940Z,
//   createdAt: 2024-03-23T15:09:55.941Z,
//   updatedAt: 2024-03-23T15:10:47.800Z,
//   __v: 0
// }