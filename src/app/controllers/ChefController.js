const { findRecipesByChef } = require('../models/Chef')
const Chef = require('../models/Chef')
const File = require('../models/File')

module.exports = {
  async index(req, res) {

    try {
      const results = await Chef.all()
      const chefs = results.rows

      return res.render('admin/chefs/index', { chefs })

    } catch (err) {
      console.error(err)
    }
  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  async post(req, res) {

    try {
      if (req.files.length == 0) {
        return res.send("Please, send at least one image!")
      }

      const filePromise = req.files.map(file => File.create({ ...file }))

      let results = await filePromise[0]
      const fileId = results.rows[0].id

      results = await Chef.create(req.body, fileId)

      return res.redirect(`chefs`)

    } catch (err) {
      console.error(err)
    }
  },
  async show(req, res) {

    try {
      const id = req.params.id

      let result = await Chef.find(id)
      const chef = result.rows[0]

      result = await findRecipesByChef(id)
      const recipes = result.rows

      if (!chef) return res.render('not-found')

      result = await Chef.files(chef.id)
      const files = result.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render('admin/chefs/show', { chef, recipes, files })

    } catch (err) {
      console.error(err)
    }
  },
  async edit(req, res) {

    try {
      let results = await Chef.find(req.params.id)
      const chef = results.rows[0]

      if (!chef) return res.render('not-found')

      results = await Chef.files(chef.id)
      let files = results.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render('admin/chefs/edit', { chef, files })

    } catch (err) {
      console.error(err)
    }
  },
  async put(req, res) {

    try {
      let results = await Chef.find(req.params.id)
      let id = results.rows[0]

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map(file =>
          File.create({ ...file }))

        results = await newFilesPromise[0]
        id = results.rows[0].id
      }

      await Chef.update(req.body, id)

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(",")
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)

        const removedFilesPromise = removedFiles.map(id => File.delete(id))

        await Promise.all(removedFilesPromise)

      }
      return res.redirect(`chefs/${req.body.id}`)

    } catch (err) {
      console.error(err)
    }
  },
  async delete(req, res) {

    try {
      const id = req.body.id

      let result = await Chef.find(id)

      result = await Chef.findRecipesByChef(id)
      const recipes = result.rows

      if (recipes.length == 0) {
        result = await Chef.delete(id)

        return res.redirect('chefs')
      }
      else
        return res.send("Não é possível deletar este chef pois ele possui pelo menos uma receita!")
    }
    catch (err) {
      console.error(err)
    }
  }
}