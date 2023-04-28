import * as WebSocket from "ws";
import Controller from "../Controllers/Controller";
import Controllers from "../index";
class MyWebSocket extends WebSocket {
    isAlive: boolean = true;
    activeController?: Controller;
    setActiveController() {
    }
}

export default MyWebSocket;