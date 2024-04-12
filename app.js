// -----------------------------------Constants and Variables-------------------------------------------

let gameArray = []
let rows = []
let columns = []

let cookieNumber = null;
let columnNumber = 4

let cookiePic = null;

let timeLeft = 20

let highScore = 0
let playerScore = 0

const timer = document.querySelector('#timer')
timer.innerText = timeLeft
let timerInterval = null;

const updateTimer = () => {
    // ChatGPT helped with this code: https://chat.openai.com/c/6a37ffb8-48c9-43fd-9a5a-f738bf2bf722
    timer.innerText = timeLeft
    timeLeft--
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        timer.innerText = "Time's up!";
    }
}


// -----------------------------------QuerySelectors----------------------------------------------------

document.querySelector('#your-score').innerText = playerScore
document.querySelector('#high-score').innerText = highScore

const dropZone = document.querySelector('#dropZone')
// this code was gotten from Youtube content creator "Darwin Tech": https://www.youtube.com/watch?v=_G8G1OrEOrI
dropZone.addEventListener('dragover', e=>{
    e.preventDefault()
})

document.querySelector('#restart').addEventListener('click', e => {
    // chatGPT definitely helped with this code: https://chat.openai.com/c/b5238c30-289f-4511-8ce2-47197b7ed0f8
    const parent = document.getElementById('dropZone');
    const childrenToRemove = parent.getElementsByClassName('cookiePic');
    const childrenArray = Array.from(childrenToRemove);
    childrenArray.forEach(x => {
        parent.removeChild(x);
    });
    playerScore = 0
    document.querySelector('#your-score').innerText = playerScore
    startGame(columnNumber);
    // window.location.reload()
})

document.querySelector('#getColNo').addEventListener('click', e=>{
    const inputValue = parseInt(document.querySelector('#numberColumns').value);
    if (inputValue > 10){
        columnNumber = 10;
    } else if (inputValue < 4){
        columnNumber = 4
    } else {
        columnNumber = inputValue;
    }
    startGame(columnNumber)
})

// -----------------------------------Functions---------------------------------------------------------

// create board
const createBoard = (colNo) => {
    const gameboardContainer = document.querySelector('#gameboard-container')
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
    gameboardContainer.appendChild(board)
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

// create cookie 
const createCookie = () => {    
    const cookiePic = document.createElement('img')
    // Image author: Vincent Le Moign: https://commons.wikimedia.org/wiki/File:556-cookie.svg
    cookiePic.src = './cookie-pic.png' 
    cookiePic.style.maxWidth = '47px'
    cookiePic.style.maxHeight = '47px'
    cookiePic.setAttribute('class', 'cookiePic')
    cookiePic.setAttribute('cursor', 'move')
    cookiePic.setAttribute('draggable', 'true')
    return cookiePic;
}

// make cells clickable, game playable
const cellsClickable = (cookieNumber) => {
    
    document.querySelectorAll('.cell').forEach(x =>{
        x.addEventListener('click', e => {
            const id = parseInt(e.target.id)
            timerInterval = setInterval(updateTimer, 1000);
            if (gameArray[id] === 'o'){
                cookiePic = createCookie()
                e.target.appendChild(cookiePic)
                document.querySelector('h2').innerText = 'YOU WIN A COOOKIE!'
                // enable cookie dragging: this code was gotten from Youtube content creator "Darwin Tech": https://www.youtube.com/watch?v=_G8G1OrEOrI
                dropZone.addEventListener('drop', e=>{
                    dropZone.appendChild(cookiePic)
                    playerScore = dropZone.querySelectorAll('.cookiePic').length;
                    document.querySelector('#your-score').innerText = playerScore;
                    highScore++
                    document.querySelector('#high-score').innerText = highScore;
                    console.log(playerScore);
                    startGame(columnNumber)
                })
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

    // console.clear()
    
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
    
    // console.log('gameArray:', gameArray);
    // console.log('rows:', rows);
    // console.log('columns:', columns);
}

// -----------------------------------Start Game--------------------------------------------------------

startGame(columnNumber)