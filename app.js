let gameArray = [
    0, 1, 2, 
    3, 4, 5, 
    6, 7, 8
]

const topRow = [0, 1, 2]
const midRow = [3, 4, 5]
const bottomRow = [6, 7, 8]

const firstColumn = [0, 3, 6]
const secondColumn = [1, 4, 7]
const thirdColumn = [2, 5, 8]

const rows = [
    topRow,
    midRow,
    bottomRow
]

const columns = [
    firstColumn,
    secondColumn,
    thirdColumn
]

let cookieNumber = null;

const startGame = () => {
    // clear everything
    gameArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    document.querySelectorAll('.cell').forEach(x => {
        x.innerText = ''
    })
    document.querySelector('h2').innerText = ''
    console.clear()

    // set new place for cookie
    cookieNumber = Math.floor(Math.random() * 9)
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