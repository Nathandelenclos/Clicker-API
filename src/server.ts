import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import controllersHttp from './http/index';
import Controller from "./http/Controllers/Controller";
import {IncomingMessage} from "http";
import MyWebSocket from "./socket/config/MyWebSocket";
import Controllers from "./socket";
import { connect } from 'mongoose'
import { urlencoded, json, raw } from 'body-parser';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(raw());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

controllersHttp.controllers.forEach((route: Controller) => {
    const middlewares = route.middlewares || [];

    if (route.get) app.get(route.route, middlewares, route.get);
    if (route.post) app.post(route.route, middlewares, route.post);
    if (route.put) app.put(route.route, middlewares, route.put);
    if (route.delete) app.delete(route.route, middlewares, route.delete);
});

wss.on('connection', (ws: MyWebSocket, req: IncomingMessage) => {
    ws.activeController = Controllers.controllers.find((controller: Controller) => controller.route == req.url);
    ws.activeController?.connexion?.(ws);

    ws.on('pong', () => {
        ws.isAlive = true;
        ws.activeController?.pong?.(ws);
    });
    ws.on('message', (message: string) => {
        ws.activeController?.message?.(ws, message);
    });
});

const port = process.env.PORT;
server.listen(port, async () => {
    await connect('mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DB);
    console.log("database connected");
    console.log(`Server started on port http://localhost:${port})`);
});
