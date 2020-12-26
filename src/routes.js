const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const SiteController = require('./app/controllers/SiteController')
const RecipeController = require('./app/controllers/RecipeController')
const ChefController = require('./app/controllers/ChefController')

// Site
routes.get('/', SiteController.index)
routes.get('/about', SiteController.about)
routes.get('/recipes', SiteController.all)
routes.get("/recipes/:id", SiteController.show)
routes.get("/results", SiteController.results)
routes.get("/chefs", SiteController.chefs)

// Recipes
routes.get("/admin/recipes", RecipeController.index)
routes.get("/admin/recipes/create", RecipeController.create)
routes.get("/admin/recipes/:id", RecipeController.show)
routes.get("/admin/recipes/:id/edit", RecipeController.edit)

routes.post("/admin/recipes", multer.array("photos", 5), RecipeController.post)
routes.put("/admin/recipes", multer.array("photos", 5), RecipeController.put)
routes.delete("/admin/recipes", RecipeController.delete)

// Chefs
routes.get("/admin/chefs", ChefController.index)
routes.get("/admin/chefs/create", ChefController.create)
routes.get("/admin/chefs/:id", ChefController.show)
routes.get("/admin/chefs/:id/edit", ChefController.edit)

routes.post("/admin/chefs", multer.array("photos", 1), ChefController.post)
routes.put("/admin/chefs", multer.array("photos", 1), ChefController.put)
routes.delete("/admin/chefs", ChefController.delete)

routes.use((req, res) => {  
  return res.status(404).render('site/not-found')
})

module.exports = routes