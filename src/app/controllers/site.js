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
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 9
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        if (recipes == "") return res.redirect('/not-found')

        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }
        return res.render('site/recipes', { recipes, pagination, filter })
      }
    }

    Recipe.paginate(params)
  },
  show(req, res) {
    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.render('site/not-found')

      return res.render(`site/recipe`, { recipe })
    })
  },
  results(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 6
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        if (recipes == "") return res.redirect('/not-found')
        
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }
        return res.render('site/results', { recipes, pagination, filter })
      }
    }

    Recipe.paginate(params)
  },
  chefs(req, res) {
    Chef.all((chefs) => {
      return res.render('site/chefs', { chefs })
    })
  }
}