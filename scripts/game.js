export default class Game {
    board = [];
    emptyCell = 16;

    constructor() {
        const table = document.querySelectorAll("td");
        for(let i = 0; i < 4; i++) {
            const row = [];
            for (let j = 0; j < 4; j++) {
                row[j] = {};
                row[j].entry = table[(i*4)+j];
                row[j].number = -1;
            }
            this.board.push(row);
        }
    }
    
    fillTable() {
        let randomNumber = Math.floor(Math.random() * this.emptyCell)+ 1;
        let count = 0;
        for(const row of this.board) {
            for(const cell of row) {
                if(cell.number != -1) {
                    continue;
                }
                else {
                    if(count == randomNumber) {
                        cell.number = 2;
                        const entry = document.createElement('div');
                        entry.classList.add('table-cell-creation');
                        entry.textContent = '2';
                        cell.entry.appendChild(entry);

                        //cell.entry.textContent='2';
                        break;
                        /*
                        const entry = document.createElement('div');
                        entry.textContent= '2';
                        entry.setAttribute('class', 'table-element');
                        cell.entry.appendChild(entry);
                        */
                        /*
                        cell.entry.style.color = 'var(--color-2-4)';
                        cell.entry.style.backgroundColor = 'var(--color-2-background)';
                        cell.entry.style.borderColor = 'var(--color-2-background)';
                        cell.entry.style.transition = 'all 2s;';
                        cell.entry.style.borderColor = 'var(--game-border-color)';
                        */
                        //cell.entry.classList.add('table-cell-border-remove');
                        
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


}