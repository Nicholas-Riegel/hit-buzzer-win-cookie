// const firstRow = [0, 1, 2, 3]
// const secondRow = [4, 5, 6, 7]
// const thirdRow = [8, 9, 10, 11]
// const fourthRow = [12, 13, 14, 15]

// const firstColumn = [0, 4, 8, 12]
// const secondColumn = [1, 5, 9, 13]
// const thirdColumn = [2, 6, 10, 14]
// const fourthColumn = [3, 7, 11, 15]

// const rows = [
//     firstRow,
//     secondRow,
//     thirdRow,
//     fourthRow
// ]

// const columns = [
//     firstColumn,
//     secondColumn,
//     thirdColumn,
//     fourthColumn
// ]

// const calculateRows = (numberColumns) => {
//     const rows  = []
//     let k = 0
//     for (let i = 0; i < numberColumns; i++){
//         const row = []
//         for(let j = 0; j < numberColumns; j++){
//             row.push(k)
//             k++
//         }
//         rows.push(row)
//     }
//     return rows;
// }

// console.log(calculateRows(2));

// const calculateColumns = (numberColumns) => {
//     const columns  = []
//     let k = 0
//     for (let i = 0; i < numberColumns; i++){
//         const column = []
//         for(let j = 0; j < numberColumns; j++){
//             column.push(k + i)
//             k += numberColumns
//         }
//         k = 0
//         columns.push(column)
//     }
//     return columns;
// }

// console.log(calculateColumns(2));

// const cookiePic = document.getElementById("static-cookie-pic")
// cookiePic.addEventListener('dragstart', e=>{
//     return false;
// })

// const dropZone = document.querySelector('#dropZone')
// const image = document.querySelector('#cookiePic')
// // const imageDiv = document.querySelector('#image-div')

// image.addEventListener('dragstart', e=>{
//     return false;
// })

// dropZone.addEventListener('dragover', e=>{
//     e.preventDefault()
// })

// dropZone.addEventListener('drop', e=>{
//     dropZone.prepend(image)
// })