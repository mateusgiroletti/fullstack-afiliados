import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class TransactionController {
    async get(req: Request, res: Response) {
        try {
            const allTransactions = await prismaClient.$queryRaw(
                Prisma.sql`SELECT
                                SUM(CASE WHEN transactionTypeId = 3 THEN - value ELSE value END) AS total,
                                seller as name_seller
                            FROM
                                Transaction
                            WHERE
                                1 = 1
                            GROUP BY
                                seller`
            );
            return res.json(allTransactions);
        } catch (error) {
            return res.status(500).json({ "msg": error });
        }
    }
}