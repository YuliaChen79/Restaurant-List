const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//render search
router.get('/search', (req, res) => {
  const keyword = req.query.keywords
  const sort = req.query.sort
  const options = {
    'AtoZ': { name: 'asc' },
    'ZtoA': { name: 'desc' },
    'category': { category: 'asc' },
    'location': { location: 'asc' },
    'ratingDesc': {rating: 'desc'},
    'ratingAsc': {rating: 'asc'}
  }
  console.log(options[sort])
  Restaurant.find()
    .lean()
    .sort(options[sort])
    .then(restaurants => {
      const restaurantFilted = restaurants.filter(data => {
        return data.name.toLowerCase().includes(keyword.toLowerCase()) || data.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: restaurantFilted, keyword: keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router