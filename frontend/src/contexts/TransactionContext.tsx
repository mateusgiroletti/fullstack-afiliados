import { createContext, useState } from "react";

export const TransactionContext = createContext({});


function TransactionProvider({ children }: any) {
    const [fetchTransaction, setFetchTransaction] = useState(false);

    return (
        <TransactionContext.Provider value={{ fetchTransaction, setFetchTransaction }} >
            {children}
        </TransactionContext.Provider>
    );
}

export default TransactionProvider;