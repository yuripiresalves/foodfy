const Chef = require('../models/Chef')

module.exports = {
  index(req, res) {

    Chef.all((chefs) => {
      return res.render('admin/chefs/index', { chefs})
    })
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  post(req, res) {

    Chef.create(req.body, (chef) => {
      return res.redirect(`chefs/${chef.id}`)
    })

  },
  show(req, res) {
    
    Chef.find(req.params.id, (chef) => {
      if (!chef) return res.render('not-found')

      return res.render('admin/chefs/show', { chef })
    })

  },
  edit(req, res) {

    Chef.find(req.params.id, (chef) => {
      if (!chef) return res.render('not-found')

      return res.render('admin/chefs/edit', { chef })
    })


  },
  put(req, res) {

    Chef.update(req.body, () => {
      return res.redirect(`chefs/${req.body.id}`)
    })

  },
  delete(req, res) {
    
    Chef.delete(req.body.id, () => {
      return res.redirect('chefs')
    })
  }
}