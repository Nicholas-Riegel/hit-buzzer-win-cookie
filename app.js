let gameArray = []
const rows = []
const columns = []

let cookieNumber = null;
let columnNumber = 7

// create board
const createBoard = (colNo) => {
    const body = document.querySelector('body')
    const board = document.createElement('section')
    board.setAttribute('id', 'gameboard')
    board.style.width = `${50 * colNo}px`
    board.style.gridTemplateColumns = `repeat(${colNo}, 1fr)`
    for(let i = 0; i < colNo ** 2; i++){
        const cell = document.createElement('div')
        cell.setAttribute('class', 'cell')
        cell.setAttribute('id', i)
        board.appendChild(cell)
    }
    body.prepend(board)
}

// calculate rows
const calculateRows = (colNo) => {
    let k = 0
    for (let i = 0; i < colNo; i++){
        const row = []
        for(let j = 0; j < colNo; j++){
            row.push(k)
            k++
        }
        rows.push(row)
    }
}

// calculate columns
const calculateColumns = (colNo) => {
    let k = 0
    for (let i = 0; i < colNo; i++){
        const column = []
        for(let j = 0; j < colNo; j++){
            column.push(k + i)
            k += colNo
        }
        k = 0
        columns.push(column)
    }
}

// make cells clickable, game playable
const cellsClickable = (cookieNumber) => {
    
    document.querySelectorAll('.cell').forEach(x =>{
        x.addEventListener('click', e => {
            const id = parseInt(e.target.id)
            if (gameArray[id] === 'x'){
                e.target.innerText = 'x'
                document.querySelector('h2').innerText = 'YOU WIN A COOOKIE!'
            } else {
                e.target.innerText = 'o';
                rows.forEach(x => {
                    if (x.includes(id) && x.includes(cookieNumber)){
                        document.querySelector('h2').innerText = "It's in this row!";
                    }
                })
                columns.forEach(x => {
                    if (x.includes(id) && x.includes(cookieNumber)){
                        document.querySelector('h2').innerText = "It's in this column!";
                    }
                })
            }
        })
    })
}

const startGame = (colNo) => {
    // clear everything
    gameArray.length = 0
    if (document.querySelector('#gameboard')){
        document.querySelector('#gameboard').remove();
    }
    document.querySelector('h2').innerText = ''
    console.clear()
    
    // create new board
    createBoard(colNo)
    
    // reset game array
    for(let i = 0; i < colNo ** 2; i++){
        gameArray.push(i)
    }
    // set new place for cookie
    cookieNumber = Math.floor(Math.random() * colNo ** 2)
    gameArray[cookieNumber] = 'x'

    // calculate rows and columns
    calculateColumns(colNo)
    calculateRows(colNo)

    // make cells clickable etc.
    cellsClickable(cookieNumber)
}

startGame(columnNumber)


document.querySelector('#restart').addEventListener('click', e => {
    startGame(columnNumber);
})