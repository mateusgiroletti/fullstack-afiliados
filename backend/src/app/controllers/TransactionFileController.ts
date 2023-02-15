import { Request, Response } from "express";
import fs from "node:fs";
import prismaClient from "./database/prismaClient";

import { transformDataToObject } from "../utils/tranformDatas";

export class TransactionFileController {
    async handle(req: Request, res: Response) {

        const fileLocation = req?.file?.path;

        if (fileLocation) {
            //Get file content
            const data = fs.readFileSync(fileLocation, "utf8");

            //Transform to array and remove empty values
            const dataTransform = data.split("\n").filter((entry) => entry.trim() != "");

            //Transform array values for array of object
            const transactions = transformDataToObject(dataTransform);

            //Insert in database
            const newTransactions = await prismaClient.transaction.createMany({
                data: transactions
            });
        }






        return res.json({ "msg": "ok" });
    }
}