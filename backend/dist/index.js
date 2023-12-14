"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connect_1 = require("./db/connect");
const validEnv_1 = __importDefault(require("./utils/validEnv"));
const PORT = validEnv_1.default.PORT || 3000;
(0, connect_1.connectToDB)()
    .then(() => {
    console.log("connected to db");
    app_1.default.listen(PORT, () => {
        console.log("server is running on: " + PORT);
    });
})
    .catch(() => (0, connect_1.disconnectFromDB)());
