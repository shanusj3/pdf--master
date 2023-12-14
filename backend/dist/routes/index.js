"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/index.ts
const express_1 = require("express");
const fileRoute_1 = __importDefault(require("./fileRoute"));
const user_routes_1 = __importDefault(require("./user-routes"));
const appRoutes = (0, express_1.Router)();
appRoutes.use("/file", fileRoute_1.default);
appRoutes.use("/auth", user_routes_1.default);
appRoutes.get("/", (req, res) => {
    res.send("hello");
});
exports.default = appRoutes;
