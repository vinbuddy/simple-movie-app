function changeGalleryToRow(data = []) {
    const rowItems = [];
    let colNum = 10;
    let rowNum = data.length / colNum;

    for (let i = 0; i < rowNum; i++) {
        const result = data.slice(i * colNum, i * colNum + colNum);
        rowItems.push(result);
    }

    return rowItems;
}

export default changeGalleryToRow;
