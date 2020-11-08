const express = require('express');
const routes = express.Router();
const recipes = require('./app/controllers/recipes');
const data = require('../data.json')

// Routes do site
routes.get('/', (req, res) => {
  return res.render('index', { recipes: data.recipes })
})
routes.get('/about', (req, res) => {
  return res.render('about')
})
routes.get('/recipes', (req, res) => {
  return res.render('recipes', { recipes: data.recipes })
})
routes.get("/recipes/:index", function (req, res) {
  const recipeIndex = req.params.index;

  if (!data.recipes[recipeIndex]) {
    return res.render('not-found')
  }

  return res.render('recipe', { recipe: data.recipes[recipeIndex] })
})

// Routes do Admin
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.use((req, res) => {  
  return res.status(404).render('not-found')
})

module.exports = routes;