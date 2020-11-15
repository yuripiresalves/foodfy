const Recipe = require('../models/Recipe')

module.exports = {
  index(req, res) {

    Recipe.all((recipes) => {
      return res.render('admin/recipes/index', { recipes })
    })
  },
  create(req, res) {

    Recipe.chefsSelectOptions((options) => {
      return res.render('admin/recipes/create', { chefOptions: options })

    })

  },
  post(req, res) {

    Recipe.create(req.body, (recipe) => {
      return res.redirect(`recipes/${recipe.id}`)
    })

  },
  show(req, res) {

    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.render('not-found')

      return res.render('admin/recipes/show', { recipe })
    })

  },
  edit(req, res) {

    Recipe.find(req.params.id, (recipe) => {
      if (!recipe) return res.render('not-found')

      Recipe.chefsSelectOptions((options) => {
        return res.render('admin/recipes/edit', { recipe, chefOptions: options })

      })

    })
  },
  put(req, res) {

    Recipe.update(req.body, () => {
      return res.redirect(`recipes/${req.body.id}`)
    })

  },
  delete(req, res) {

    Recipe.delete(req.body.id, () => {
      return res.redirect('recipes')
    })
  }
}