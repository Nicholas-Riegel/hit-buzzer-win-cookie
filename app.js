let gameArray = [
    0, 1, 2, 3, 
    4, 5, 6, 7, 
    8, 9, 10, 11,
    12, 13, 14, 15
]

const firstRow = [0, 1, 2, 3]
const secondRow = [4, 5, 6, 7]
const thirdRow = [8, 9, 10, 11]
const fourthRow = [12, 13, 14, 15]

const firstColumn = [0, 4, 8, 12]
const secondColumn = [1, 5, 9, 13]
const thirdColumn = [2, 6, 10, 14]
const fourthColumn = [3, 7, 11, 15]

const rows = [
    firstRow,
    secondRow,
    thirdRow,
    fourthRow
]

const columns = [
    firstColumn,
    secondColumn,
    thirdColumn,
    fourthColumn
]

let cookieNumber = null;
let columnNumber = 4

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

createBoard(columnNumber)

const startGame = (colNo) => {
    // clear everything
    gameArray.length = 0
    for(let i = 0; i < colNo ** 2; i++){
        gameArray.push(i)
    }
    document.querySelectorAll('.cell').forEach(x => {
        x.innerText = ''
    })
    document.querySelector('h2').innerText = ''
    console.clear()

    // create new board
    createBoard(colNo)
    // set new place for cookie
    cookieNumber = Math.floor(Math.random() * colNo ** 2)
    gameArray[cookieNumber] = 'x'
}

// startGame()

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

document.querySelector('#restart').addEventListener('click', e => {
    startGame();
})