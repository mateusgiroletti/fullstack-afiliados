import React from "react";
import ReactDOM from "react-dom/client";
import { ListTransactions } from "./components/ListTransactions";

import { UploadFile } from "./components/UploadFile";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <div className="container">
            <UploadFile />
            <ListTransactions />
        </div>
    </React.StrictMode>,
);
