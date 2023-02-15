import { FormEvent, useState } from "react";

import "./index.css";

export function UploadFile() {
    const [fileToUpload, setFileToUpload] = useState();


    function handleFileInputChange(event: FormEvent) {
        setFileToUpload(event.target.files[0]);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", fileToUpload);

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
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <form className="form-upload" onSubmit={handleSubmit}>
            <label htmlFor="file">Insira o arquivo de vendas aqui:</label>
            <input type="file" name="file" id="file" onChange={handleFileInputChange} required />

            <button type="submit">Enviar</button>
        </form>
    );
}