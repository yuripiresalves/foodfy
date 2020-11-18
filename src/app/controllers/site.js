const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  index(req, res) {
    const { filter } = req.query

    if (filter) {
      Recipe.findBy(filter, (recipes) => {
        return res.render('site/results', { recipes, filter })

      })
    } else {
      Recipe.all((recipes) => {
        return res.render('site/index', { recipes })

      })
    }
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
  },
  chefs(req, res) {
    Chef.all((chefs) => {
      return res.render('site/chefs', { chefs })
    })
  }
}