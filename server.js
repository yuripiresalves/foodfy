const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server
})

server.get('/', (req, res) => {
    return res.render('index', { recipes })
})

server.get('/about', (req, res) => {
    return res.render('about')
})

server.get('/recipes', (req, res) => {
    return res.render('recipes', { recipes })
})

server.get("/recipes/:index", function (req, res) {
    const recipes = [] // Array de receitas carregadas do data.js
    const recipeIndex = req.params.index
  
    return res.render('recipe', { recipes })
    console.log(recipes[recipeIndex]);
  })

server.listen(5000, () => {
    console.log("pai ta on")
})