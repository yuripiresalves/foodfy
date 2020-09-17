const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    noCache: true,
    autoescape: false
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
    const recipeIndex = req.params.index;

    if(!recipes[recipeIndex]) {
        return res.render('not-found')
    }
    
    return res.render('recipe', { recipe: recipes[recipeIndex] })
  })

server.use((req, res) => {
    return res.status(404).render('not-found')
})

server.listen(5000, () => {
    console.log("pai ta on")
})