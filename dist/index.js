"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const App_1 = __importDefault(require("./src/App"));
const port = process.env.PORT || process.env.APP_PORT_NUMBER || 3000;
const server = http_1.default.createServer(App_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
App_1.default.get("/server/heartbeat", (req, res) => {
    res.status(200).send("Server is active and running..");
});
App_1.default.set("io", io);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
