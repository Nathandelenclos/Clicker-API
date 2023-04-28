import MyWebSocket from "../config/MyWebSocket";

type Middleware = (ws: MyWebSocket) => boolean;

export default Middleware;