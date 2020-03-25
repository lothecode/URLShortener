const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
// 因為connect - flash是需要存儲在session模塊，需要安裝express - session
const Record = require('./models/record')
const randomGen = require('./randomgen')
const host = 'http://localhost:3000/'

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  // 如果不是 production 模式
  require('dotenv').config()
  // 使用 dotenv 讀取 .env 檔案
}

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('views/images'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortURL', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true
}))

app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// home page
app.get('/', (req, res) => {
  res.render('index')
})

// shorten URL action
app.post('/', (req, res) => {
  const inputURL = req.body.url
  const urlValidate = inputURL.slice(0, 4)
  console.log(urlValidate)

  if (urlValidate === '') {
    req.flash('warning_msg', '您尚未輸入網址')
    console.log('empty')
    res.redirect('/')
  } else if (urlValidate != 'http') {
    req.flash('warning_msg', '您輸入的不是網址(ex. http(s)://...)')
    console.log('this is not a url')
    res.redirect('/')
  } else {
    randomCode = randomGen()
    console.log('Random Code is', randomCode)
    Record.findOne({ random_code: randomCode }, (err, used) => {
      if (err) return console.error(err)

      if (used) {
        console.log('used')
        return res.redirect(307, '/') // 307 Temporary Redirect
      } else {
        const record = new Record({
          input: inputURL,
          random_code: randomCode
        })
        record.save(err => {
          if (err) return console.error(err)
          return res.render('output', { output: `${host}${randomCode}` })
        })
      }
    })
  }
}
)

// copy URL action
app.post('/output', (req, res) => {
  let success_message = '您已成功複製網址'
  console.log('copied')
  res.render('output', { output: `${randomCode}`, success_message })
})

// short URL redirect to original url
app.get('/:code', (req, res) => {
  console.log(req.params.code)
  Record.findOne({ random_code: req.params.code }, (err, record) => {
    if (err) return console.error(err)
    res.redirect(`${record.input}`)
  })
})

app.listen(process.env.PORT || port, () => {
  console.log(`app is running on localhost:${port}`)
})