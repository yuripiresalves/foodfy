const data = require('./data')

exports.index = (req, res) => {
  return res.render('admin/recipes/index', { recipes: data })
}

exports.create = (req, res) => {
  return res.render('admin/recipes/create')
}

exports.show = (req, res) => {
  const recipeIndex = req.params.index

  if (!data[recipeIndex]) {
    return res.render('not-found')
  }

  return res.render('admin/recipes/show', { recipe: data[recipeIndex], recipeIndex })
}

exports.edit = (req, res) => {
  return res.render('admin/recipes/edit')
}