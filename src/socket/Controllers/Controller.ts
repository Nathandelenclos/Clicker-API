import Middleware from "../Middleware/Middleware";
import MyWebSocket from "../config/MyWebSocket";

interface Controller {
    route: string;
    message?: (ws: MyWebSocket, message: string) => void;
    pong?: (ws: MyWebSocket) => void;
    connexion?: (ws: MyWebSocket) => void;
}

export default Controller;