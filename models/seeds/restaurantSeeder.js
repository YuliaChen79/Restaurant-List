const Restaurant = require('../restaurant')
const restaurantList = require('../restaurant.json').results
const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  Restaurant.create(restaurantList)
  console.log('done')
})