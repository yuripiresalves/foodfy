const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data.json')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  noCache: true,
  autoescape: false
})

server.get('/', (req, res) => {
  return res.render('index', { recipes: recipes.recipes })
})

server.get('/about', (req, res) => {
  return res.render('about')
})

server.get('/recipes', (req, res) => {
  return res.render('recipes', { recipes: recipes.recipes })
})

server.get("/recipes/:index", function (req, res) {
  const recipeIndex = req.params.index;

  if (!recipes.recipes[recipeIndex]) {
    return res.render('not-found')
  }

  return res.render('recipe', { recipe: recipes.recipes[recipeIndex] })
})

server.use((req, res) => {
  return res.status(404).render('not-found')
})

server.listen(5000, () => {
  console.log("pai ta on")
})