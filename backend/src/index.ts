import express from "express";
import cors from "cors";

import routes from "./router";

const app = express();

app.use(cors({
    origin: "http://localhost:3001"
}));
app.use(express.json());
app.use(routes);

app.listen(3000);