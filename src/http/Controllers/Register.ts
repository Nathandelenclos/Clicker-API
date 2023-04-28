import Controller from "./Controller";
import Middleware from "../Middleware/Middleware";
import {Request, Response} from "express";
import User from "../../database/User";
import { sign } from 'jsonwebtoken'
import { hashSync } from "bcrypt";

export class Register implements Controller {
    route: string = "/register";

    middlewares: Middleware[] = [];

    post(req: Request, res: Response): void {
        if (!req.body.username || !req.body.password || !req.body.email) {
            res.sendStatus(400);
            return;
        }
        const newUser = new User({
            name: req.body.username,
            password: hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS ?? "10")),
            email: req.body.email,
            score: 0
        });

        newUser.save().then(r => {
            console.info("New user registered: " + r);
            res.json({
                message: "User registered",
                token: sign({
                    id: r._id,
                }, process.env.JWT_SECRET ?? ""),
            })
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
    }
}
