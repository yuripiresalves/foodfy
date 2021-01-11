const Recipe = require('../models/Recipe')

const LoadRecipeService = require('../services/LoadRecipeService')
const LoadChefService = require('../services/LoadChefService')

module.exports = {
  async index(req, res) {
    try {
      const { filter } = req.query

      if (filter) {
        const recipes = await Recipe.findByFilter(filter)

        return res.render('site/results', { recipes, filter })

      } else {
        const allRecipes = await LoadRecipeService.load('recipes', "")
        const recipes = allRecipes
        .filter((recipe, index) => index > 5 ? false : true)

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

      const recipes = await LoadRecipeService.load('recipes', params)

      if (recipes == "") return res.redirect('site/not-found')

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
      const recipe = await LoadRecipeService.load('recipe', req.params.id)

      if (!recipe) return res.render('site/not-found')

      return res.render(`site/recipe`, { recipe })

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

      const recipes = await LoadRecipeService.load('recipes', params)

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
      const chefs = await LoadChefService.load('chefs')

      if (!chefs) return res.render('site/not-found')

      return res.render('site/chefs', { chefs })

    } catch (err) {
      console.error(err)
    }
  },
  async chef(req, res) {
    try {
      const chef = await LoadChefService.load('chef', req.params.id)

      if (!chef) return res.render('site/not-found')

      const recipes = await LoadChefService.load('chefRecipes', chef.id)

      return res.render('site/chef', { chef, recipes })

    } catch (err) {
      console.error(err)
    }
  }
}