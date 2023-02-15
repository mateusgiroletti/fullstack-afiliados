import { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

import "./index.css";

interface transactionsProps {
    name_seller: string;
    total: number;
}

export function ListTransactions() {
    const [transactions, setTransactions] = useState<transactionsProps[]>([]);
    const { fetchTransaction, setFetchTransaction } = useContext(TransactionContext);

    useEffect(() => {
        fetch("http://localhost:3000/transactions")
            .then(data => data.json())
            .then(items => {
                setTransactions(items);
            });
    }, [fetchTransaction]);

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
                        transactions.map((item, i) => {
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