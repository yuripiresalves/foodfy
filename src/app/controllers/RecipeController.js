const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
  async index(req, res) {

    const results = await Recipe.all()
    const recipes = results.rows

    return res.render('admin/recipes/index', { recipes })
  },
  async create(req, res) {

    const results = await Recipe.chefsSelectOptions()
    const chefOptions = results.rows

    return res.render('admin/recipes/create', { chefOptions })

  },
  async post(req, res) {

    if (req.files.length == 0) {
      return res.send("Pleae, send at least one image!")
    }

    let results = await Recipe.create(req.body)
    const recipeId = results.rows[0].id

    const filesPromise = req.files.map(file => File.createRecipeFile({ ...file, recipe_id: recipeId }))
    await Promise.all(filesPromise)

    return res.redirect(`recipes/${recipeId}/edit`)

  },
  async show(req, res) {

    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) return res.render('not-found')

    results = await Recipe.files(recipe.id)
    const files = results.rows.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render('admin/recipes/show', { recipe, files })

  },
  async edit(req, res) {

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


  },
  async put(req, res) {

    if (req.files.length != 0) {
      const newFilesPromise = req.files.map(file => 
        File.createRecipeFile({...file, recipe_id: req.body.id}))

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
  },
  async delete(req, res) {

    await Recipe.delete(req.body.id)

    return res.redirect('recipes')
  }
}
