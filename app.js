let gameArray = []
let rows = []
let columns = []

let cookieNumber = null;
let columnNumber = 3

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
            if (gameArray[id] === 'o'){
                // e.target.innerText = 'o'
                const cookiePic = document.createElement('img')
                cookiePic.src = './cookie-pic.png' // Image author: Vincent Le Moign: https://commons.wikimedia.org/wiki/File:556-cookie.svg
                cookiePic.style.maxWidth = '47px'
                cookiePic.style.maxHeight = '47px'
                e.target.appendChild(cookiePic)
                document.querySelector('h2').innerText = 'YOU WIN A COOOKIE!'
            } else {
                e.target.innerText = 'x'
                document.querySelector('h2').innerText = '';
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
    gameArray = []
    rows = []
    columns = []
    if (document.querySelector('#gameboard')){
        document.querySelector('#gameboard').remove();
    }
    document.querySelector('h2').innerText = ''
    document.querySelector('#numberColumns').value = ''
    console.clear()
    
    // create new board
    createBoard(colNo)
    
    // reset game array
    for(let i = 0; i < colNo ** 2; i++){
        gameArray.push(i)
    }
    // set new place for cookie
    cookieNumber = Math.floor(Math.random() * colNo ** 2)
    gameArray[cookieNumber] = 'o'

    // calculate rows and columns
    calculateColumns(colNo)
    calculateRows(colNo)

    // make cells clickable etc.
    cellsClickable(cookieNumber)

    console.log('gameArray:', gameArray);
    console.log('rows:', rows);
    console.log('columns:', columns);
}

document.querySelector('#restart').addEventListener('click', e => {
    startGame(columnNumber);
})

document.querySelector('#getColNo').addEventListener('click', e=>{
    const inputValue = parseInt(document.querySelector('#numberColumns').value);
    if (inputValue > 10){
        columnNumber = 10;
    } else if (inputValue < 3){
        columnNumber = 3
    } else {
        columnNumber = inputValue;
    }
    startGame(columnNumber)
})

startGame(columnNumber)