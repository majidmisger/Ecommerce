const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");



// schema for user
var userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastName:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        required:true
    },

    salt:String,

    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }

},{timestamps:true})

// Virtuals 
userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    // method for encrypting Password
    securePassword :function(plainPassword){
        if(!plainPassword) return ""
        try {
            return crypto 
               .createHmac('sha256', this.salt)
               .update(plainPassword)
               .digest('hex');

        } catch (error) {
            return ""
        }
    },

    //authenticate here 
    authenticate : function(plainPassword){
        return this.securePassword(plainPassword) === this.encry_password
    }

}



module.exports = mongoose.model("User",userSchema)