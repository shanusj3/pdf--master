"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validators_1 = require("../utils/validators");
const UserControllers_1 = require("../controllers/UserControllers");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", (0, validators_1.validate)(validators_1.signupValidator), UserControllers_1.userSignup);
userRouter.post("/login", (0, validators_1.validate)(validators_1.loginValidator), UserControllers_1.userLogin);
userRouter.get("/logout", UserControllers_1.userLogout);
userRouter.get("/getuser/:userId", UserControllers_1.getUser);
exports.default = userRouter;