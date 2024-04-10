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

const startGame = () => {
    // clear everything
    gameArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    document.querySelectorAll('.cell').forEach(x => {
        x.innerText = ''
    })
    document.querySelector('h2').innerText = ''
    console.clear()

    // set new place for cookie
    cookieNumber = Math.floor(Math.random() * 16)
    gameArray[cookieNumber] = 'x'
}

startGame()

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