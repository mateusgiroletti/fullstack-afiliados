import { createContext, ReactNode, useState } from "react";

type TransactionContextProps = {
    children: ReactNode
}

type TransactionContextType = {
    isFetchTransaction: boolean;
    setIsFetchTransaction: (newState: boolean) => void;
}

const initialValue = {
    isFetchTransaction: false,
    setIsFetchTransaction: () => { },
};

export const TransactionContext = createContext<TransactionContextType>(initialValue);

function TransactionProvider({ children }: TransactionContextProps) {
    const [isFetchTransaction, setIsFetchTransaction] = useState(initialValue.isFetchTransaction);

    return (
        <TransactionContext.Provider value={{ isFetchTransaction, setIsFetchTransaction }} >
            {children}
        </TransactionContext.Provider>
    );
}

export default TransactionProvider;