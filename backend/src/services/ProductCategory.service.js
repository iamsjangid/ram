const httpStatus = require("http-status")
const { ApiError } = require("../utils/ApiError")
const { uploadImage } = require("../utils/cloudinary")
const { ProductCategoryModel } = require("../models")
const slugify = require("slugify")
const { Categoriesoperations } = require("../constant")

class ProductService{
        static async  AddCategory(body,file){

            if(!file){
                throw new ApiError(httpStatus.BAD_REQUEST,"image is required")
                return
            }


                    const checkExist = await ProductCategoryModel.findOne({title:new RegExp(body.title, 'i')});

                    if(checkExist){
                throw new ApiError(httpStatus.BAD_REQUEST,"use another title")
                        return
                    }

            const result = await uploadImage(file.path,'categories')
            const slug = slugify(body.title, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: false,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi',      // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`
            })
                                
            await ProductCategoryModel.create({
                title:body.title,
                slug,
                category_image:{
                    uri:result.secure_url,
                    image_id:result.public_id
                }

            })
            
            return {
              msg:"Category Added"
            }
        } 

        static async  GetAllCategories(){


                const categories = await ProductCategoryModel.find().select("-category_image.image_id -category_image._id -__v -updatedAt")
            
            return {
                msg:"categories fetched",
              categories,
              total:categories.length
            }
        } 


        static async AddSubCategory(body){
                        const  {subCategory,category} = body

                        
                    const checkExist = await ProductCategoryModel.findById(category);

                    if(!checkExist){
                throw new ApiError(httpStatus.BAD_REQUEST,"category not exist")
                        return
                    } 
            const slug = slugify(subCategory, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: false,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi',      // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`
            })
                    
                    
                    await ProductCategoryModel.findByIdAndUpdate(category,{
                        $push:{
                            sub_categories:{
                                title:subCategory,
                                        slug,
                                        isActive:false
                            }
                        }
                    })

                    return {
                        msg:"Sub Category Added"
                    }
        }

        static async BasicoperationCategory(body){

             const  {operation,id} = body
                const checkExist = await ProductCategoryModel.findById(id);

                    if(!checkExist){
                throw new ApiError(httpStatus.BAD_REQUEST,"Category not exist")
                        return
                    } 
           

                switch (operation) {
                    case Categoriesoperations.DELETE:
                                  await ProductCategoryModel.findByIdAndDelete(id)
                     return {
                msg:"Category Deleted"
            }
                        break;
                case Categoriesoperations.STATUS:
                                  await ProductCategoryModel.findByIdAndUpdate(id,{
                                    isActive:!checkExist.isActive
                                  })
                     return {
                msg:"Category Updated"
            }
                        break;

                         case Categoriesoperations.DELETE_SUB_CATEGORY:
                                  await ProductCategoryModel.findByIdAndUpdate(id,{
                                            $pull:{
                                                'sub_categories':{_id:body.sub_id}
                                            }
                                  })
                     return {
                msg:"Sub Category Deleted"
            }
                        break;
                
                    default:
                        throw new ApiError(httpStatus.BAD_REQUEST,"Invalid Operation")
                        return {
                            
                        }
                }
                        
                  
           
        }
}

module.exports  = ProductService