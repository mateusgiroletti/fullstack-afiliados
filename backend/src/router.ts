import { Router } from "express";
import { TransactionFileController } from "./app/controllers/TransactionFileController";

const routes = Router();

const uploadTransactionFile = new TransactionFileController();

routes.post("/upload", uploadTransactionFile.handle);

export default routes;