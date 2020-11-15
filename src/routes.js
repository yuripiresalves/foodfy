const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes')
const Recipe = require('./app/models/Recipe')
const chefs = require('./app/controllers/chefs')

// Site
routes.get('/', (req, res) => {

  Recipe.all((recipes) => {
    return res.render('index', { recipes })

  })
})
routes.get('/about', (req, res) => {
  return res.render('about')
})
routes.get('/recipes', (req, res) => {

  Recipe.all((recipes) => {
    return res.render('recipes', { recipes })

  })
})
routes.get("/recipes/:id", function (req, res) {
  // const recipeIndex = req.params.index;

  // if (!data.recipes[recipeIndex]) {
  //   return res.render('not-found')
  // }

  // return res.render('recipe', { recipe: data.recipes[recipeIndex] })

  Recipe.find(req.params.id, (recipe) => {
    if (!recipe) return res.render('not-found')

    return res.render('recipes', { recipe })
  })
})

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
  return res.status(404).render('not-found')
})

module.exports = routes