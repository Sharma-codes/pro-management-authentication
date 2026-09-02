import { Router } from "express";
import{ 
    login, 
    registerUser ,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    verifyEmail, 
    resendEmailVerification,
    forgotPasswordRequest,
    resetForgotPassword,
    changeCurrentPassword, 
} from "../controllers/auth.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";

import { userRegisterValidator } from "../validators/index.js";
import { userLoginValidator } from "../validators/index.js";
import { userForgotPasswordValidator } from "../validators/index.js";
import { userResetForgotPasswordValidator } from "../validators/index.js";
import { userChangeCurrentPasswordValidator } from "../validators/index.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

// Unsecure route
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post( userLoginValidator(), validate, login);
router
    .route("/verify-email/:verificationToken")
    .get(verifyEmail);
router
    .route("/refresh-token")
    .post(refreshAccessToken);
    
router

    .route("/forgot-password")
    .post(userForgotPasswordValidator(), validate,  forgotPasswordRequest);

router
    .route("/reset-password/:resetToken")
    .post(userResetForgotPasswordValidator(), validate,  resetForgotPassword);    

//Secure route for logout, only accessible to authenticated users
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT,userChangeCurrentPasswordValidator(), validate, changeCurrentPassword);
router.route("/resend-email-verification").post(verifyJWT, resendEmailVerification);

export default router;