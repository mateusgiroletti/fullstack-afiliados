import path from "node:path";
import { isTxtFile, transformDataToObject } from "../../src/app/utils/tranformDatas";

describe("Transaction", () => {
    it("should be check the file extension is txt", () => {
        const file = path.resolve(__dirname, "./sales.txt");

        const returnChechIsTxtFile = isTxtFile(file);

        expect(returnChechIsTxtFile).toBe(true);

    });

    it("should be transform txt to data object", () => {
        const data = [
            "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
            "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
            "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
            "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
            "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
        ];

        const dataTransform = transformDataToObject(data);

        expect(dataTransform).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "date": expect.any(Date),
                    "product": expect.any(String),
                    "seller": expect.any(String),
                    "transactionTypeId": expect.any(Number),
                    "value": expect.any(Number),
                })
            ])
        );

    });
});