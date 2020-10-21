exports.index = (req, res) => {
  return res.render('admin/recipes/index')
}

exports.create = (req, res) => {
  return res.render('admin/recipes/create')
}