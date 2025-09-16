import { Router } from "express";
import {refreshAcessToken, registerUser,loginUser,logoutUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/register").post(
       upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
              name:"coverImage",
              maxCount:1
        }
       ])  ,  
    registerUser
)
 router.route("/login").post(loginUser)

 //secred  

 router.route("/logout").post(verifyJWT,logoutUser)
 router.route("/refresh-token").post(refreshAcessToken)
export default router