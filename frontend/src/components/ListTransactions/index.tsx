import { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import { showNotification } from "../../utils/showNotifications";
import { Loading } from "../Loading";

import "./index.css";

interface transactionsProps {
    name_seller: string;
    total: string;
}

export function ListTransactions() {
    const [transactions, setTransactions] = useState<transactionsProps[]>([]);
    const [isTransationsLoading, setIsTransationsLoading] = useState<boolean>(true);
    const { isFetchTransaction } = useContext(TransactionContext);

    useEffect(() => {
        const fetchData = async () => {
            await fetch("http://localhost:3000/transactions")
                .then(data => data.json())
                .then(items => {
                    setTransactions(items);
                })
            ;
        };

        fetchData()
            .catch(() => {
                showNotification("Erro ao buscar as transações!", "error");
            });

        setIsTransationsLoading(false);
    }, [isFetchTransaction]);

    function formatMoneyToReal(value: string) {
        let newValue = value.replace(/\D/g, "");
        newValue = newValue.replace(/(\d{1,2})$/, ",$1");
        newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

        return `R$ ${newValue}`;
    }

    return (
        <>
            {
                !isTransationsLoading ?
                    (
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
                                                    <td>{formatMoneyToReal(item.total)}</td>
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
                        </table>
                    ) :
                    (
                        <Loading />
                    )
            }
        </>

    );
}