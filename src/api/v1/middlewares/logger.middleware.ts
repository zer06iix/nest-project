import { NestMiddleware, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`request ip: ${req.ip}\nrequest sending time: ${new Date}\nrequest method: ${req.method}`);
        next();
    }
}