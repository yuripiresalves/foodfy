const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  async index(req, res) {

    try {
      const { filter } = req.query

      if (filter) {
        let results = await Recipe.findBy(filter)
        const recipes = results.rows

        return res.render('site/results', { recipes, filter })

      } else {

        let results = await Recipe.all()
        const recipes = results.rows

        return res.render('site/index', { recipes })
      }

    } catch (err) {
      console.error(err)
    }
  },
  about(req, res) {
    return res.render('site/about')
  },
  async all(req, res) {

    try {
      let { filter, page, limit } = req.query

      page = page || 1
      limit = limit || 9
      let offset = limit * (page - 1)

      const params = {
        filter,
        page,
        limit,
        offset
      }

      let results = await Recipe.paginate(params)
      const recipes = results.rows

      if (recipes == "") return res.redirect('/not-found')

      const pagination = {
        total: Math.ceil(recipes[0].total / limit),
        page
      }

      return res.render('site/recipes', { recipes, pagination, filter })

    } catch (err) {
      console.error(err)
    }
  },
  async show(req, res) {

    try {
      let result = await Recipe.find(req.params.id)
      const recipe = result.rows[0]

      if (!recipe) return res.render('not-found')

      result = await Recipe.files(recipe.id)
      const files = result.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render(`site/recipe`, { recipe, files })

    } catch (err) {
      console.error(err)
    }
  },
  async results(req, res) {

    try {

      let { filter, page, limit } = req.query

      page = page || 1
      limit = limit || 6
      let offset = limit * (page - 1)

      const params = {
        filter,
        page,
        limit,
        offset
      }

      let results = await Recipe.paginate(params)
      const recipes = results.rows

      if (recipes == "") return res.redirect('/not-found')

      const pagination = {
        total: Math.ceil(recipes[0].total / limit),
        page
      }

      return res.render('site/results', { recipes, pagination, filter })

    } catch (err) {
      console.error(err)
    }
  },
  async chefs(req, res) {

    try {
      const results = await Chef.all()
      const chefs = results.rows

      return res.render('site/chefs', { chefs })
      
    } catch (err) {
      console.error(err)
    }
  }
}