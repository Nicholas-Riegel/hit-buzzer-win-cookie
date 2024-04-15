// -----------------------------------Constants and Variables-------------------------------------------

let gameArray = []
let rows = []
let columns = []

let cookieNumber = null;
let columnNumber = 5

let cookiePic = null;

const timer = document.querySelector('#timer')
let timeLeft = 30
let timerOn = false;
let timerInterval = null;

let highScore = 0
let playerScore = 0

const statusDisplay = document.querySelector('#status-display')
const dropZone = document.querySelector('#dropZone')
const startButton = document.querySelector('#start-btn')
const stopButton = document.querySelector('#stop-btn')
const columnNumberButton = document.querySelector('#getColNo')

const playerScoreDisplay = document.querySelector('#your-score')
const highScoreDisplay = document.querySelector('#high-score')

// -----------------------------------Start Page Defaults----------------------------------------------------

timer.innerText = timeLeft
playerScoreDisplay.innerText = playerScore
highScoreDisplay.innerText = highScore

// -----------------------------------Event Listeners----------------------------------------------------


// start game
startButton.addEventListener('click', e => {
    // chatGPT definitely helped with this code: https://chat.openai.com/c/b5238c30-289f-4511-8ce2-47197b7ed0f8
    const parent = document.getElementById('dropZone');
    const childrenToRemove = parent.getElementsByClassName('cookiePic');
    const childrenArray = Array.from(childrenToRemove);
    childrenArray.forEach(x => {
        parent.removeChild(x);
    });
    playerScore = 0
    document.querySelector('#your-score').innerText = playerScore
    timeLeft = 30

    if (timerOn === false){
        timerOn = true
        timer.style.color = 'rgb(246, 71, 71)';
        timerInterval = setInterval(updateTimer, 1000);
    }
    startGame(columnNumber)
})

// column number action button
columnNumberButton.addEventListener('click', e => {
    const inputValue = parseInt(document.querySelector('#numberColumns').value);
    if(inputValue && typeof inputValue === 'number'){
        if (inputValue > 10){
            columnNumber = 10;
        } else if (inputValue < 5){
            columnNumber = 5
        } else {
            columnNumber = inputValue;
        }
    } else {
        columnNumber = 5
    }
    startGame(columnNumber)
})

// this turns off the timer when stop button is pressed
stopButton.addEventListener('click', e => {
    clearInterval(timerInterval);
    timerOn = false
})

// -----------------------------------Functions---------------------------------------------------------

// timer function 
const updateTimer = () => {
    // ChatGPT helped with this code: https://chat.openai.com/c/6a37ffb8-48c9-43fd-9a5a-f738bf2bf722
    timer.innerText = timeLeft
    timeLeft--
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        timerOn = false;
        if (playerScore > highScore){
            highScore = playerScore
            highScoreDisplay.innerText = highScore
        }
        if (playerScore === 0){
            statusDisplay.innerText = "Game Over! You Lose! You didn't find any cookies!"
        } else {
            statusDisplay.innerText = "Game Over! You Win! You found some cookies!"
        }
    }
}

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
    cookiePic.src = './assets/cookie-pic.png' 
    cookiePic.style.maxWidth = '47px'
    cookiePic.style.maxHeight = '47px'
    cookiePic.setAttribute('class', 'cookiePic')
    return cookiePic;
}

const cookieFoundAction = (e) => {
    
    cookiePic = createCookie()
    e.target.appendChild(cookiePic)
    statusDisplay.innerText = 'YOU GET A COOOKIE!'
    if (window.innerWidth > 810){
        cookiePic.setAttribute('cursor', 'move')
        cookiePic.setAttribute('draggable', 'true')
        // enable cookie dragging: this code was gotten from Youtube content creator "Darwin Tech": 
        // https://www.youtube.com/watch?v=_G8G1OrEOrI
        // this code was gotten from Youtube content creator "Darwin Tech": https://www.youtube.com/watch?v=_G8G1OrEOrI
        dropZone.addEventListener('dragover', e => {
            e.preventDefault()
        })
        dropZone.addEventListener('drop', e=>{
            if (timerOn === true){
                dropZone.appendChild(cookiePic)
                playerScore = dropZone.querySelectorAll('.cookiePic').length;
                playerScoreDisplay.innerText = playerScore;
                startGame(columnNumber)
            }
        })
    } else if (timerOn === true){
            dropZone.appendChild(cookiePic)
            playerScore = dropZone.querySelectorAll('.cookiePic').length;
            playerScoreDisplay.innerText = playerScore;
            startGame(columnNumber)
    }
}

const cookieNotFoundAction = (e, id) => {
    e.target.innerText = 'x'
    statusDisplay.innerText = '';
    rows.forEach(x => {
        if (x.includes(id) && x.includes(cookieNumber)){    
            statusDisplay.innerText = "It's in this row!";
        }
    })
    columns.forEach(x => {
        if (x.includes(id) && x.includes(cookieNumber)){
            statusDisplay.innerText = "It's in this column!";
        }
    })
}


// make cells clickable, game playable
const cellsClickable = () => {    
    document.querySelectorAll('.cell').forEach(x =>{
        x.addEventListener('click', e => {
            if (timerOn){

                const id = parseInt(e.target.id)
                
                if (gameArray[id] === 'o'){
                
                    cookieFoundAction(e)

                } else {
                    
                    cookieNotFoundAction(e, id)
                }
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
    statusDisplay.innerText = ''
    document.querySelector('#numberColumns').value = ''

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
    cellsClickable()
    
}

// -----------------------------------Start Game--------------------------------------------------------

startGame(columnNumber)