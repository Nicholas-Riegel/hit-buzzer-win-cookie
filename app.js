// document.querySelector('button').addEventListener('click', e => {

//     document.querySelector('h2').innerText = 'YOU WIN A COOOKIE!'

// })

let gameArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const startGame = () => {
    gameArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    document.querySelectorAll('.cell').forEach(x => {
        x.innerText = ''
    })
    document.querySelector('h2').innerText = ''
    const random = Math.floor(Math.random() * 9)
    gameArray[random] = 'x'
}

startGame()

document.querySelectorAll('.cell').forEach(x =>{
    x.addEventListener('click', e => {
        if (gameArray[parseInt(e.target.id)] === 'x'){
            e.target.innerText = 'x'
            document.querySelector('h2').innerText = 'YOU WIN A COOOKIE!'
        } else {
            e.target.innerText = 'o'
        }
    })
})

document.querySelector('#restart').addEventListener('click', e => {
    startGame();
})