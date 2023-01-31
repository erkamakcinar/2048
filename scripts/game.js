export default class Game {

    /* 
    A board entry has 2 properties
    entry is a dom element
    number is the value of the element
    */
    board = [];
    emptyCell = 16;

    constructor() {
        const table = document.querySelectorAll("td");

        for (let i = 0; i < 4; i++) {
            const row = [];
            for (let j = 0; j < 4; j++) {
                row[j] = {};
                row[j].entry = table[(i * 4) + j];
                row[j].number = -1;
            }

            this.board.push(row);
        }
    }

    fillTable() {

        let randomNumber = Math.floor(Math.random() * this.emptyCell) + 1;
        let count = 1;
        for (const row of this.board) {
            for (const cell of row) {
                if (cell.number != -1) {
                    continue;
                }
                else {
                    if (count == randomNumber) {
                        cell.number = 2;
                        const entry = document.createElement('div');
                        entry.classList.add('table-cell-creation');
                        entry.textContent = '2';
                        cell.entry.appendChild(entry);
                        break;
                    }
                    else {
                        count += 1;
                    }
                }
            }
            if (count == randomNumber) {
                break;
            }
        }
        this.emptyCell--;
    }

    moveLeft() {
        /* 
        A splitted board entry has 2 properties
        cell is a board entry
        row index is the row index of board
        column index is the column index of board
        */
        const splittedBoard = []
        for (let rowIndex = 0 ; rowIndex < this.board.length; rowIndex++) {
            let splittedRow = [];
            let splittedRowEntry = {};
            for (let columnIndex = 0; columnIndex < this.board[rowIndex].length; columnIndex++) {
                if (this.board[rowIndex][columnIndex].number != -1) {
                    splittedRowEntry.cell = this.board[rowIndex][columnIndex];
                    splittedRowEntry.boardRowIndex = rowIndex;
                    splittedRowEntry.boardColumnIndex = columnIndex;
                    splittedRow.push(splittedRowEntry);
                }
            }
            splittedBoard.push(splittedRow);
        }

        //table index is the row index of board
        let tableIndex = 0;

        for (let splittedRow of splittedBoard) {
            if (splittedRow.length != 0) {

                //empty entry
                let tableDiv = document.createElement('div');

                //table row index is the column index of board
                let tableRowIndex = 0;

                //traversing trimmed rows
                for (let splittedIndex = 0; splittedIndex < splittedRow.length - 1; splittedIndex++) {

                    // Is the element in the index equal to the next element?
                    if (splittedRow[splittedIndex] == splittedRow[splittedIndex + 1]) {
                        this.board[tableIndex][tableRowIndex].number = splittedRow[splittedIndex].cell.number + splittedRow[splittedIndex + 1].cell.number;
                        tableDiv.textContent = this.board[tableIndex][tableRowIndex].number;
                        this.board[tableIndex][tableRowIndex].entry.appendChild(tableDiv);
                        this.board[tableIndex][tableRowIndex].entry.style.transition = 'all 0.3s ease-in-out';
                        this.board[tableIndex][tableRowIndex].entry.style.transform = `translate(5px, 5px)`;
                        splittedIndex++;

                    }
                    else {
                        this.board[tableIndex][tableRowIndex].number = splittedRow[splittedIndex].cell.number;
                        tableDiv.textContent = this.board[tableIndex][tableRowIndex].number;
                        this.board[tableIndex][tableRowIndex].entry.appendChild(tableDiv);
                        this.board[tableIndex][tableRowIndex].entry.style.transition = 'all 0.3s ease-in-out';
                        this.board[tableIndex][tableRowIndex].entry.style.transform = `translate(5px, 5px)`;
                    }
                    tableRowIndex++;
                }
                this.board[tableIndex][tableRowIndex].number = splittedRow[splittedRow.length - 1].cell.number;
                tableDiv.textContent = this.board[tableIndex][tableRowIndex].number;
                this.board[tableIndex][tableRowIndex].entry.appendChild(tableDiv);
                tableDiv.style.transition = 'all 2s ease-in-out';
                tableDiv.style.transform = `translate(55px, 45px)`;
                tableIndex++;
            }
            else {
                tableIndex++;
                continue;
            }
        }

        /*
        for(let row of this.board) {
            let emptyFlag = false;
            let fullFlag = false;
            for(let i = 0; i < row.length; i++) {
                let emptyEnty = {};
                let entry1 = {};
                if(row[i].number == -1 && !emptyFlag) {
                    emptyEnty = row[i];
                    emptyFlag = true;
                }
                else {
                    if(row[i].number == -1 && !fullFlag) {
                        continue
                    }
                    
                    else {
                        if(fullFlag) {
                            const entry = document.createElement('div');
                            if(emptyFlag) {
                                emptyEnty.number = entry1.number + row[i].number;
                                entry.textContent = emptyEnty.number;
                                emptyEnty.entry.appendChild(entry);
                                emptyFlag = false;
                            } 
                            else {
                                entry1.number = entry1.number + row[i].number;
                                entry.textContent = entry1.number;
                                entry1.entry.appendChild(entry);
                            }
                            row[i].entry.remove()
                            row[i].number = -1;
                            fullFlag = false;
                        }
                        else {
                            entry1 = row[i];
                            fullFlag = true;
                            continue;
                        }
                    }
                }
            }
        }
        */
    }
}