import Controller from "./Controller";
import Middleware from "../Middleware/Middleware";
import {Request, Response} from "express";

export class Home implements Controller {
    route: string = "/";

    middlewares: Middleware[] = [];

    get(req: Request, res: Response): void {
        res.json({message: "Hello World!"});
    }
}
