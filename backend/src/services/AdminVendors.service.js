const httpStatus = require("http-status")
const { ApiError } = require("../utils/ApiError")
const { uploadImage, deleteImage } = require("../utils/cloudinary")
const { VendorsModel } = require("../models")

class AdminVendorsService{
            static async createVendor(body,file){



                if(!file.photo || file.photo.length<1){
                    throw new ApiError(httpStatus.BAD_REQUEST,"Upload Vendor Image")
                    return
                }
                
                 if(!file.adhar_card || file.adhar_card.length<1){
                    throw new ApiError(httpStatus.BAD_REQUEST,"Upload Vendor Adhar Card")
                    return
                }
                 if(!file.agreement || file.agreement.length<1){
                     throw new ApiError(httpStatus.BAD_REQUEST,"Upload Vendor Agreement")
                     return
                    }
                    


                            const checkExist =  await  VendorsModel.findOne({email:body.email,mobile_no:body.mobile_no})

                            if(checkExist){
                               throw new ApiError(httpStatus.BAD_REQUEST,"Vendor Already Exist")
                               return
                            }


                    const obj = {}

                    const photo_result = await uploadImage(file.photo[0].path);
                    obj['photo'] = {
                        uri : photo_result.secure_url,
                        public_id: photo_result.public_id
                    }

                    
                    const adhar_card_result = await uploadImage(file.adhar_card[0].path);
                    obj['adhar_card'] = {
                        uri : adhar_card_result.secure_url,
                        public_id: adhar_card_result.public_id
                    }

                    const agreement_result = await uploadImage(file.agreement[0].path);
                    obj['agreement'] = {
                        uri : agreement_result.secure_url,
                        public_id: agreement_result.public_id
                    }

                        obj['name'] = body.name
                        obj['email'] = body.email
                        obj['mobile_no'] = body.mobile_no

                        
                         await VendorsModel.create(obj);

                        return {
                            msg:"Vendor Regiser Successfully"
                        }


                    return {
                        body,file
                    }
            }

            static async getAllVendors(){
                const vendors = await VendorsModel.find().select("name email photo.uri isActive mobile_no ");
                return{
                    vendors,
                    total:vendors.length
                }
            } 

            static async toggleActiveById(id){
                const vendor = await VendorsModel.findById(id);

                if(!vendor){
                    throw new ApiError(httpStatus.BAD_REQUEST,"Vendor Not Found")
                    return
                }
                                await VendorsModel.findByIdAndUpdate(id,{
                                        isActive:!vendor.isActive
                                })

                                return {
                                    msg:`vendor Update successfully`
                                }
                   
            }

              static async deleteVendorById(id){
                const vendor = await VendorsModel.findById(id);

                if(!vendor){
                    throw new ApiError(httpStatus.BAD_REQUEST,"Vendor Not Found")
                    return
                }

                        await deleteImage(vendor.photo.public_id) //photo
                        await deleteImage(vendor.adhar_card.public_id) //adhar_card
                        await deleteImage(vendor.agreement.public_id) //agreement


                                await VendorsModel.findByIdAndDelete(id)

                                return {
                                    msg:`vendor Delete Successfully`
                                }
                   
            }

              static async getVendorById(id){
                const vendor = await VendorsModel.findById(id).select(" photo.uri adhar_card.uri agreement.uri name email mobile_no isActive isBlocked isVerified ");

              
                                return vendor
                   
            }


}



module.exports =AdminVendorsService