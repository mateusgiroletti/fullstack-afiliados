import { useState, useEffect } from "react";

import "./index.css";

interface transactionsProps {
    name_seller: string;
    total: number;
}

export function ListTransactions() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/transactions")
            .then(data => data.json())
            .then(items => {
                setTransactions(items);
            });
    }, []);

    return (
        <table className="table-transactions" >
            <thead>
                <tr>
                    <th>Produtor/afiliado</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    transactions.length ?
                        transactions.map((item: transactionsProps, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.name_seller}</td>
                                    <td>{item.total}</td>
                                </tr>
                            );
                        }) :
                        (
                            <tr>
                                <td colSpan={2}>Não foi encontrado nenhuma transação</td>
                            </tr>
                        )
                }
            </tbody>
        </table >
    );
}