import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/indexRoute";

const server = express();
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use(router);

export default server;
