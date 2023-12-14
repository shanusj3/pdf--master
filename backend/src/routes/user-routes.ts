import { Router } from "express";
import { loginValidator, signupValidator, validate } from "../utils/validators";
import { getUser, userLogin, userLogout, userSignup } from "../controllers/UserControllers";


const userRouter = Router();
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin); 
userRouter.get("/logout", userLogout);
userRouter.get("/getuser/:userId", getUser);


export default userRouter;
