const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/shortURL', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create({
    input: 'https://www.google.com.tw/',
    randomCode: 'ZBSfN'
  },
    {
      input: 'https://tw.news.yahoo.com/',
      randomCode: 'DoBYq'
    },
    {
      input: 'https://www.books.com.tw/',
      randomCode: '4ynFH'
    }
  )
})

