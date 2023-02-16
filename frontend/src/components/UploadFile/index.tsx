import { FormEvent, useContext, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";

import { showNotification } from "../../utils/showNotifications";

import "./index.css";

import iconArrowUp from "../../assets/file-arrow-up.svg";
import { Loading } from "../Loading";

export function UploadFile() {
    const [fileToUpload, setFileToUpload] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { setIsFetchTransaction } = useContext(TransactionContext);

    function handleFileInputChange(event: FormEvent) {
        setFileToUpload(event.target.files[0]);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!fileToUpload) {
            return showNotification("Favor inserir arquivo antes de enviar!", "error");
        }

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
                    throw response.status;
                }
                response.json();
            })
            .then(() => {
                showNotification("Informações enviadas com sucesso!", "success");
            })
            .finally(() => {
                setLoading(false);
                setIsFetchTransaction(true);
                setFileToUpload("");
            })
            .catch((error) => {
                if (error == 400) {
                    showNotification("O arquivo é obrigatório!", "error");
                }
                if (error == 415) {
                    showNotification("Extensão do arquivo invalida!", "error");
                }
                if (error == 422) {
                    showNotification("A formatação do arquivo não é apropriada!", "error");
                }
                if (error == 500) {
                    showNotification("Erro interno inesperado!", "error");
                }
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
                                <input type="file" name="file" id="file" onChange={handleFileInputChange} />
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