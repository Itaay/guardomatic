function displayOnTable(tasksTable, tableElement) {
    // given a list of rows, set the tasks matrix.
    // if a cell contains a list, each item is a row in the cell itself
    tableElement.innerHTML = ''; // remove past items.
    let tableBody = document.createElement('tbody');
    let matrix = tasksTable.getTasksMatrix()
    let y = 0;
    let x = 0;
    let cellType;
    matrix.forEach(row => {
        let rowElement = document.createElement('tr');
        x = 0;
        row.forEach(cell => {
            if (x == 0 || y == 0) {
                cellType = 'th';
            }
            else {
                cellType = 'td';
            }
            let cellElement = document.createElement(cellType);
            let cellRows = cell.text;
            if (!Array.isArray(cellRows)) {   // if only one row and not list of rows, encapuslate as a one row list
                cellRows = [cellRows];
            }
            cellRows.forEach(cellRow => {
                let cellRowText = document.createElement('p');
                cellRowText.innerText = cellRow;
                cellElement.appendChild(cellRowText);
            });
            let cellClickCallback = (item => () => updateToolbar(item))(cell);
            cellElement.onclick = cellClickCallback;
            rowElement.appendChild(cellElement);
            x++;
        });
        tableBody.appendChild(rowElement);
        y++
    });
    tableElement.appendChild(tableBody);
}