const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  index(req, res) {
    Recipe.all((recipes) => {
      return res.render('site/index', { recipes })

    })
  },
  about(req, res) {
    return res.render('site/about')
  },
  all(req, res) {
    Recipe.all((recipes) => {
      return res.render('site/recipes', { recipes })

    })
  },
  show(req, res) {
    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.render('site/not-found')
  
      return res.render(`site/recipe`, { recipe })
    })
  }
}