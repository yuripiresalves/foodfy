const Chef = require('../models/Chef')

module.exports = {
  index(req, res) {

    Chef.all((chefs) => {
      return res.render('admin/chefs/index', { chefs })
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

      Chef.findRecipesByChef(req.params.id, recipes => {
        return res.render("admin/chefs/show", { chef, recipes })
      })
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
    const id = req.body.id

    Chef.find(id, (chef) => {

      Chef.findRecipesByChef(id, (recipes) => {

        if (recipes.length == 0) {
          Chef.delete(id, () => {
            return res.redirect('chefs')
          })
        }
        else {
          return res.send("Não é possível deletar este chef pois ele possui pelo menos uma receita!")
        }
      })
    })
  }
}