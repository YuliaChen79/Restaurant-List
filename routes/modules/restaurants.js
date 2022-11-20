const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//render new
router.get('/new', (req, res) => {
  return res.render('new')
})

//add new restaurant
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//render show
router.get("/:restaurantId", (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("show", { restaurantData }))
    .catch(err => console.log(err))
})

//render edit
router.get('/:restaurantId/edit', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("edit", { restaurantData }))
    .catch(err => console.log(err))
})

//edit resstaurant data
router.put('/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  Restaurant.findById(restaurantId)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

//delete restaurant
router.delete('/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  Restaurant.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router