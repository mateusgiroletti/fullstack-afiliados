import { FormEvent, useContext, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

import "./index.css";

export function UploadFile() {
    const [fileToUpload, setFileToUpload] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { fetchTransaction, setFetchTransaction } = useContext(TransactionContext);

    function handleFileInputChange(event: FormEvent) {
        setFileToUpload(event.target.files[0]);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", fileToUpload);

        setLoading(true);

        fetch(
            "http://localhost:3000/upload",
            {
                method: "POST",
                body: formData,

            })
            .then((response) => response.json())
            .then((result) => {
                console.log("Success:", result);
            })
            .finally(() => {
                setLoading(false);
                setFetchTransaction(true);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }

    return (
        <div>
            {
                !loading ?
                    (
                        <form className="form-upload" onSubmit={handleSubmit}>
                            <label htmlFor="file">Insira o arquivo de vendas aqui:</label>
                            <input type="file" name="file" id="file" onChange={handleFileInputChange} required />

                            <button type="submit">Enviar</button>
                        </form>
                    ) :
                    (
                        <h1>loading...</h1>
                    )
            }
        </div>
    );
}