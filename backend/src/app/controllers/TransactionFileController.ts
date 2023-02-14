import { Request, Response } from "express";
import prismaClient from "./database/prismaClient";

export class TransactionFileController {
    async handle(request: Request, response: Response) {
        const { file } = request.body;



        return response.json({ "msg": "ok" });
    }
}