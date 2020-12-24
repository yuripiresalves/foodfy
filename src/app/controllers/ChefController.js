const Chef = require('../models/Chef')
const File = require('../models/File')

module.exports = {
  async index(req, res) {

    const results = await Chef.all()
    const chefs = results.rows

    return res.render('admin/chefs/index', { chefs })
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  async post(req, res) {

    if (req.files.length == 0) {
      return res.send("Please, send at least one image!")
    }

    const filePromise = req.files.map(file => File.create({ ...file }))

    let results = await filePromise[0]
    const fileId = results.rows[0].id

    results = await Chef.create(req.body, fileId)

    return res.redirect(`chefs`)

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