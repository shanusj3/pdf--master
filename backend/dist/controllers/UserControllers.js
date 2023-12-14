"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.userLogout = exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
const bcrypt_1 = require("bcrypt");
const User_1 = __importDefault(require("../models/User"));
//get all user .................................................................................................................................
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        return res.status(200).json({ message: "ok", users });
    }
    catch (error) {
        return res.status(500).json({ cause: error });
    }
});
exports.getAllUsers = getAllUsers;
//user signup....................................................................................................................................
const userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return res.status(404).send("User already exist");
        const hashPassword = yield (0, bcrypt_1.hash)(password, 10);
        const user = new User_1.default({ name, email, password: hashPassword });
        yield user.save();
        return res.status(201).json({
            message: "ok",
            name: user.name,
            email: user.email,
            id: user._id,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "ERROR", cause: error });
    }
});
exports.userSignup = userSignup;
//user login.....................................................................................................................................
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordCorrect = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        return res.status(200).json({
            message: "ok",
            name: user.name,
            email: user.email,
            id: user._id,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "ERROR", cause: error });
    }
});
exports.userLogin = userLogin;
// userlogout---------------------------------------------------------------------------------------------------------------------------------------
const userLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email,
            id: user._id,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error });
    }
});
exports.userLogout = userLogout;
//getuser
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params;
    try {
        const user = yield User_1.default.findById(userId);
        return res
            .status(200)
            .json({ name: user === null || user === void 0 ? void 0 : user.name, email: user === null || user === void 0 ? void 0 : user.email, id: user === null || user === void 0 ? void 0 : user._id });
    }
    catch (error) {
        return res.status(200).json({ message: "ERROR", cause: error });
    }
});
exports.getUser = getUser;
