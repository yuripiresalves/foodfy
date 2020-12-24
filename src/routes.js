const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const site = require('./app/controllers/site')
const recipes = require('./app/controllers/RecipeController')
const chefs = require('./app/controllers/ChefController')

// Site
routes.get('/', site.index)
routes.get('/about', site.about)
routes.get('/recipes', site.all)
routes.get("/recipes/:id", site.show)
routes.get("/results", site.results)
routes.get("/chefs", site.chefs)

// Recipes
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", multer.array("photos", 5), recipes.post)
routes.put("/admin/recipes", multer.array("photos", 5), recipes.put)
routes.delete("/admin/recipes", recipes.delete)

// Chefs
routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)

routes.post("/admin/chefs", multer.array("photos", 1), chefs.post)
routes.put("/admin/chefs", multer.array("photos", 1), chefs.put)
routes.delete("/admin/chefs", chefs.delete)

routes.use((req, res) => {  
  return res.status(404).render('site/not-found')
})

module.exports = routes