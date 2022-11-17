// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

//require mongoose
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

//Mongoose connect
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
//render index
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//render new
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//add new restaurant
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//render show
app.get("/restaurants/:restaurantId", (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("show", { restaurantData }))
    .catch(err => console.log(err))
})

//render search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantFilted = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurantFilted, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})