import { FormEvent, useContext, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

import { showNotification } from "../../utils/showNotifications";

import "./index.css";

import iconArrowUp from "../../assets/file-arrow-up.svg";
import { Loading } from "../Loading";

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
            }
        )
            .then((response) => {
                if ((response.status >= 300)) {
                    throw new Error;
                }
                response.json();
            })
            .then(() => {
                showNotification("Dados Inseridos com sucesso!", "success");
            })
            .finally(() => {
                setLoading(false);
                setFetchTransaction(true);
                setFileToUpload("");
            })
            .catch(() => {
                showNotification("Erro ao enviar arquivo!", "error");
            });
    }

    return (
        <>
            {
                !loading ?
                    (
                        <form className="form-upload" onSubmit={handleSubmit}>

                            <label htmlFor="file">
                                <img src={iconArrowUp} alt="Upload File" />
                                Insira o arquivo de vendas aqui!
                                <input type="file" name="file" id="file" onChange={handleFileInputChange} /* accept=".txt" */ />
                            </label>

                            {
                                fileToUpload ?
                                    (
                                        <div className="response" >
                                            <span>Arquivo selecionado: {fileToUpload.name}</span>
                                        </div>
                                    ) : ("")
                            }

                            <button type="submit">Enviar</button>
                        </form>
                    ) :
                    (
                        <Loading />
                    )
            }
        </>
    );
}