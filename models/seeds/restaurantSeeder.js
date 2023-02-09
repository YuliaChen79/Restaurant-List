const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../restaurant.json').results
const db = require('../../config/mongoose')
const User = require('../user')
const SEED_USER = [
  {
    name: 'userA',
    email: 'user1@example.com',
    password: '12345678',
    index: [0, 1, 2]
  },
  {
    name: 'userB',
    email: 'user2@example.com',
    password: '12345678',
    index: [3, 4, 5]
  }
]

db.once('open', () => {
  return Promise.all(SEED_USER.map(user => {
    const { name, email, password, index } = user
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name: name,
        email: email,
        password: hash
      }))
      .then( user => {
        const restaurants = index.map( index => {
          const restaurant = restaurantList[index]
          restaurant.userId = user._id
          return restaurant
        })
        return Restaurant.create(restaurants)
      })
  }))
  .then(() => {
    console.log('done')
  })
})