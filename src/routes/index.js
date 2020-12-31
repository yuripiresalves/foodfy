const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const SiteController = require('../app/controllers/SiteController')

const recipes = require('./recipes')
const chefs = require('./chefs')
const users = require('./users')

// Site
routes.get('/', SiteController.index)
routes.get('/about', SiteController.about)
routes.get('/recipes', SiteController.all)
routes.get("/recipes/:id", SiteController.show)
routes.get("/results", SiteController.results)
routes.get("/chefs", SiteController.chefs)

// Recipes
routes.use('/admin/recipes', recipes)

// Chefs
routes.use('/admin/chefs', chefs)

// Users
routes.use('/admin/users', users)


routes.use((req, res) => {  
  return res.status(404).render('site/not-found')
})

module.exports = routes