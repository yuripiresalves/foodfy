exports.index = (req, res) => {
  return res.render('admin/recipes/index')
}

exports.create = (req, res) => {
  return res.render('admin/recipes/create')
}

exports.show = (req, res) => {
  return res.render('admin/recipes/show')
}

exports.edit = (req, res) => {
  return res.render('admin/recipes/edit')
}