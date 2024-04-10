// import {v2 as cloudinary} from 'cloudinary';
const {v2} =require('cloudinary');
          
v2.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SCREATE
});


const uploadImage  = async(file,folder='')=>{
  const result = await v2.uploader.upload(file,{
    folder:folder
  })

  return result;
}


const deleteImage  = async(public_id)=>{
  const result = await v2.uploader.destroy(public_id);

  return result;
}


module.exports = {
  deleteImage,
  uploadImage
}