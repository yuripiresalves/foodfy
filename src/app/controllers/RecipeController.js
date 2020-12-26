const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
  async index(req, res) {

    try {
      const results = await Recipe.all()
      const recipes = results.rows

      return res.render('admin/recipes/index', { recipes })

    } catch (err) {
      console.error(err)
    }
  },
  async create(req, res) {

    try {
      const results = await Recipe.chefsSelectOptions()
      const chefOptions = results.rows

      return res.render('admin/recipes/create', { chefOptions })

    } catch (err) {
      console.error(err)
    }
  },
  async post(req, res) {

    try {
      if (req.files.length == 0) {
        return res.send("Please, send at least one image!")
      }

      let results = await Recipe.create(req.body)
      const recipeId = results.rows[0].id

      const filesPromise = req.files.map(file => File.createRecipeFile({ ...file, recipe_id: recipeId }))
      await Promise.all(filesPromise)

      return res.redirect(`recipes/${recipeId}`)

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

      return res.render('admin/recipes/show', { recipe, files })

    } catch (err) {
      console.error(err)
    }
  },
  async edit(req, res) {

    try {
      let results = await Recipe.find(req.params.id)
      const recipe = results.rows[0]

      if (!recipe) return res.render('not-found')

      // get chefs
      results = await Recipe.chefsSelectOptions()
      const chefOptions = results.rows

      //get images
      results = await Recipe.files(recipe.id)
      let files = results.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render('admin/recipes/edit', { recipe, chefOptions, files })

    } catch (err) {
      console.error(err)
    }
  },
  async put(req, res) {

    try {
      if (req.files.length != 0) {
        const newFilesPromise = req.files.map(file =>
          File.createRecipeFile({ ...file, recipe_id: req.body.id }))

        await Promise.all(newFilesPromise)
      }

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(",")
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)

        const removedFilesPromise = removedFiles.map(id => File.delete(id))

        await Promise.all(removedFilesPromise)

      }

      await Recipe.update(req.body)

      return res.redirect(`recipes/${req.body.id}`)

    } catch (err) {
      console.error(err)
    }
  },
  async delete(req, res) {

    try {
      await Recipe.delete(req.body.id)

      return res.redirect('recipes')

    } catch (err) {
      console.error(err)
    }
  }
}
