import { Request, Response } from "express";
import fs from "node:fs";
import prismaClient from "./database/prismaClient";

import { transformDataToObject } from "../utils/tranformDatas";

export class TransactionFileController {
    async handle(req: Request, res: Response) {
        try {
           
            const fileLocation = req?.file?.path;

            if (!fileLocation) {
                return res.status(400).json({ "msg": "File is required!" });
            }

            //Get file content
            const data = fs.readFileSync(fileLocation, "utf8");

            if (!data) {
                return res.status(400).json({ "msg": "File formatting is not appropriate!" });
            }

            //Transform to array and remove empty values
            const dataTransform = data.split("\n").filter((entry) => entry.trim() != "");

            //Transform array values for array of object
            const transactions = transformDataToObject(dataTransform);

            //Insert in database
            await prismaClient.transaction.createMany({
                data: transactions
            });

            return res.json(transactions);
        } catch (error) {
            return res.status(500).json({ "msg": error });
        }

    }
}