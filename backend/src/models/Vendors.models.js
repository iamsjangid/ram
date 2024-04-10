const mongoose = require("mongoose")

/**
 *  const initialValues = {
      name:'',
      email:'',
      mobile_no:'',
      photo: null,
      adhar_card: null,
      agreement: null,


    }
 */

const Schema = new mongoose.Schema({

                
                name:{
                    type:String,
                    required:true
                },
                email:{
                    type:String,
                    required:true
                },
                mobile_no:{
                    type:String,
                    required:true
                },
                photo:{
                    type:{
                        uri:{
                            type:String
                        },
                        public_id:{
                            type:String
                        }
                    }
                },
                adhar_card:{
                    type:{
                        uri:{
                            type:String
                        },
                        public_id:{
                            type:String
                        }
                    }
                },
                agreement:{
                    type:{
                        uri:{
                            type:String
                        },
                        public_id:{
                            type:String
                        }
                    }
                },

                isActive:{
                    type:Boolean,
                    default:true
                },
                isBlocked:{
                    type:Boolean,
                    default:false
                },
                isVerified:{
                    type:Boolean,
                    default:false
                },
                vendor_type:{
                    type:String,
                    default:''
                }

},{timestamps:true})


module.exports = mongoose.model("vendor",Schema)