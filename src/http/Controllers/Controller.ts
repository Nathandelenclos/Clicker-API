import Middleware from "../Middleware/Middleware";
import {Response, Request} from "express";

interface Controller {
    route: string;
    middlewares?: Middleware[];
    get?: (req: Request, res: Response) => void;
    post?: (req: Request, res: Response) => void;
    put?: (req: Request, res: Response) => void;
    delete?: (req: Request, res: Response) => void;
}

export default Controller;
