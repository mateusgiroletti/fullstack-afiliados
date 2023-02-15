import os from "node:os";
import { Router } from "express";
import multer from "multer";

import { TransactionFileController } from "./app/controllers/TransactionFileController";
import { TransactionController } from "./app/controllers/TransactionController";

const routes = Router();

const uploadTransactionFile = new TransactionFileController();
const transactionController = new TransactionController();

const upload = multer({ dest: os.tmpdir() });

routes.get("/transactions", transactionController.get);
routes.post("/upload", upload.single("file"), uploadTransactionFile.handle);

export default routes;