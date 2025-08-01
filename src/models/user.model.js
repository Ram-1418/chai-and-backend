import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema =new Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//cloudinary url
        requaried:true
    },
    coverImage:{
        type:String,

    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],
    password:{
        type:String,
        requaried:[true,'password is requaried']
    },
    refreshToken:{
        type:String
    }

}
)

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password= await bcrypt.hash(this.password,10)
    next()

    
})

userSchema.method.isPasswordcorrect= async function (password) {
    return await bcrypt.compare(password,this.password)
}
userSchema.method.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.method.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
       process.env.REFRESH_TOKEN_SECRET,
       {
        expiresIn:env.REFRESH_TOKEN_EXPIRY
       }
    )
}
export const User = mongoose.model("User",userSchema)