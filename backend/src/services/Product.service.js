const { ProductModel, ProductCategoryModel, AdminProductModel } = require("../models")
const generateProductSeed = require("../seeds/Product")

class ProductService{
  static async addProduct() {
    const products = generateProductSeed(5);

   
        const promises = products.map(async (cur) => {
            const productInstance = new ProductModel(cur);
            const savedProduct = await productInstance.save();
            return savedProduct;
        });

        const all_data = await Promise.all(promises);

        return {
            msg: "Products Added",
            all_data
        };
    } 


      static async getAllProducts() {
                    const products = await ProductModel.find({}).select("-sizeSet")

                    return {
                        products,
                        total:products.length
                    }

    } 

    static async getAllCategories(){
        const categories = await ProductCategoryModel.find().select("-category_image.image_id -category_image._id -__v -updatedAt -sub_categories ")
            
            return {
                msg:"categories fetched",
              categories,
              total:categories.length
            }
    }
  static async getProductBySlug(slug){ 
        const product = await AdminProductModel.findOne({slug:slug}) 
            
            return {
                msg:"product fetched",
              product, 
              slug
            }
    }
}

module.exports = ProductService