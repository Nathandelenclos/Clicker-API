import Controller from "./Controller";
import Middleware from "../Middleware/Middleware";
import {Request, Response} from "express";
import { sign } from 'jsonwebtoken'
import User from "../../database/User";
import { compareSync } from "bcrypt";

export class Auth implements Controller {
    route: string = "/login";

    middlewares: Middleware[] = [];

    async post(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        if (!req.body.username || !req.body.password) {
            res.sendStatus(400);
            return;
        }
        const user = await User.findOne({name: req.body.username});
        if (!user) {
            res.sendStatus(401);
            return;
        }
        if (compareSync(req.body.password, user.password)) {
            res.sendStatus(401);
            return;
        }
        res.json({
            message: "User logged in",
            token: sign({
                id: user._id,
            }, process.env.JWT_SECRET ?? "")
        });
    }
}
