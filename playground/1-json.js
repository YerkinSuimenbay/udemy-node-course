const fs = require('fs')
// const book = {
//     title: 'T1',
//     author: 'YS'
// }

// const bookJSON = JSON.stringify(book)

// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data);

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)
user.name = 'Yerkinnn'
user.age = 23
const userJSON = JSON.stringify(user)
fs.writeFileSync('1-json.json', userJSON)