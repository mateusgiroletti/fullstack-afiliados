function transformDataToObject(datas: Array<string>) {
    const newDatas = datas.map((data) => {
        return {
            transactionTypeId: Number(data.slice(0, 1)),
            date: new Date(data.slice(1, 26)),
            product: data.slice(26, 50).trim(),
            value: Number(data.slice(56, 66)),
            seller: data.slice(66).trim(),
        };
    });

    return newDatas;
}

function isTxtFile(file: any) {
    const fileExtension = file.split(".")[1];

    if (fileExtension != "txt") {
        return false;
    }

    return true;

}

export { transformDataToObject, isTxtFile };