const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema



const ProductCartSchema = new mongoose.Schema({
    product:{
        type :ObjectId,
        ref:"Product"
    },
    name:{
        type:String
    },
    count:{
        type:Number,
        default:1
    },
    price :{
        type : Number,
    }
},{timestamps:true})

const ProductCart = mongoose.Schema("ProductCart",ProductCartSchema)


const orderSchema = mongoose.Schema({

    products:[ProductCartSchema],
    transaction_id:{},
    amount:{
        type:number
    },
    address:{
        type:String,
        maxlength:500,
        trim:true
    },
    updated : Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Order = mongoose.Schema("Order",orderSchema)


module.exports = {Order,ProductCart}