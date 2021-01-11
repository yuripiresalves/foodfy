const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const SiteController = require('../app/controllers/SiteController')

const adminRoutes = require('./admin')

// Site
routes.get('/', SiteController.index)
routes.get('/about', SiteController.about)
routes.get('/recipes', SiteController.all)
routes.get("/recipes/:id", SiteController.show)
routes.get("/results", SiteController.results)
routes.get("/chefs", SiteController.chefs)
routes.get("/chefs/:id", SiteController.chef)

// Recipes
routes.use('/admin', adminRoutes)


routes.use((req, res) => {
  if (req.session.userId) {
    return res.status(404).render('admin/parts/not-found')
  } else {
    return res.status(404).render('site/not-found')
  }
})

module.exports = routes