import Controller from "./Controller";

class Home implements Controller {
    route: string = "/";

    pong(ws: any): void {
        ws.send("Alive !");
    }

    message(ws: any, message: string): void {
        ws.send("Hello World!");
        console.log(message);
    }
}

export default Home;