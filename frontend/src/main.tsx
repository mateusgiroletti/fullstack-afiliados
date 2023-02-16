import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { ListTransactions } from "./components/ListTransactions";
import "react-toastify/dist/ReactToastify.css";

import { UploadFile } from "./components/UploadFile";
import TransactionProvider from "./contexts/TransactionContext";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <TransactionProvider>
            <div className="container">
                <div className="content">
                    <UploadFile />
                    <ListTransactions />
                </div>
            </div>
        </TransactionProvider>
        <ToastContainer />
    </React.StrictMode>,
);
