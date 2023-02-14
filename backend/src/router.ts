import { Router } from "express";

const routes = Router();

routes.post("/upload", (req, res) => {
    res.send("ok");
});

export default routes;