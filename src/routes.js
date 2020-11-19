const express = require('express')
const routes = express.Router()
const site = require('./app/controllers/site')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')

// Site
routes.get('/', site.index)
routes.get('/about', site.about)
routes.get('/recipes', site.all)
routes.get("/recipes/:id", site.show)
routes.get("/results", site.results)
routes.get("/chefs", site.chefs)

// Admin
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

// Chefs
routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)

routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)

routes.use((req, res) => {  
  return res.status(404).render('site/not-found')
})

module.exports = routes