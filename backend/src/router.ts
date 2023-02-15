import os from "node:os";
import { Router } from "express";
import multer from "multer";

import { TransactionFileController } from "./app/controllers/TransactionFileController";

const routes = Router();

const uploadTransactionFile = new TransactionFileController();

const upload = multer({ dest: os.tmpdir() });

routes.post("/upload", upload.single("file"), uploadTransactionFile.handle);

export default routes;