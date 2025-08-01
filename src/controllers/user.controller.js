import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import{ApiResponse} from "../utils/ApiResponse.js"

const registerUser=asyncHandler(async(req,res)=>{
    const {fullName,email, username,password}= req.body
  console.log("email",email)  

  if (
    [fullName,email,username,password].some((field)=>
    field?.trim()==='')
  ) {
    throw new ApiError(400, 'All fieldes are  requaired')
  }
  const exittedUser=User.findOne({
    $or:[{username},{email}]
  })
    if (exittedUser) {
        throw new ApiError(409,"Users with email or username already exits")
    }

    const avatarLocalPath= req.fiels?.avatar[0]?.path;
    const coveerImageLocalPath=req.fiels?.coverImage[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400,"avatra files is requaried")
    }
      
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coveerImageLocalPath)

    const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
      new ApiResponse(200,createdUser,"User registered Successfully")
    )
})


export {
    registerUser,
}