const Record = require('./models/record')

function randomCodeGenerator() {
  console.log('this function will generate 5 digitals random code')
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = lowercase.toUpperCase()
  const numbers = '1234567890'
  let collection = []
  collection = collection.concat(lowercase.split('')).concat(uppercase.split('')).concat(numbers.split(''))
  let randomCode = ''
  for (let x = 0; x < 5; x++) {
    randomCode += randomNo(collection)
  }
  return randomCode
}

function randomNo(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = randomCodeGenerator