const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
  async index(req, res) {

    try {
      const results = await Recipe.all()
      const recipes = results.rows

      if (!recipes) return res.render('not-found')

      async function getImage(recipeId) {
        let results = await Recipe.files(recipeId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

        return files[0]
      }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })

      const lastAdded = await Promise.all(recipesPromise)

      return res.render('admin/recipes/index', { recipes: lastAdded })

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

      req.body.user_id = req.session.userId

      let results = await Recipe.create(req.body)
      const recipe = results.rows[0]

      const filesPromise = req.files.map(file => File.createRecipeFile({ ...file, recipe_id: recipe.id }))
      await Promise.all(filesPromise)

      results = await Recipe.chefsSelectOptions()
      let chefOptions = results.rows

      results = await Recipe.files(recipe.id)
      let files = results.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))


      return res.render('admin/recipes/edit', {
        recipe: req.body,
        chefOptions,
        files,
        success: "Receita cadastrada com sucesso!"
      })

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

      results = await Recipe.chefsSelectOptions()
      const chefOptions = results.rows

      results = await Recipe.files(recipe.id)
      let files = results.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      if (recipe.user_id !== req.session.userId && !req.session.isAdmin) return res.render(`admin/recipes/show`, {
        recipe,
        files,
        error: "Você não pode editar esta receita!"
      })

      return res.render('admin/recipes/edit', { recipe, chefOptions, files })

    } catch (err) {
      console.error(err)
    }
  },
  async put(req, res) {

    try {
      let results = await Recipe.find(req.body.id)
      const recipe = results.rows[0]

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map(file =>
          File.createRecipeFile({ ...file, recipe_id: recipe.id }))

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

      results = await Recipe.chefsSelectOptions()
      let chefOptions = results.rows

      results = await Recipe.files(recipe.id)
      let files = results.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render('admin/recipes/edit', {
        recipe: req.body,
        chefOptions,
        files,
        success: "Receita atualizada com sucesso!"
      })

    } catch (err) {
      console.error(err)
      return res.render('admin/recipes/edit', {
        recipe: req.body,
        chefOptions,
        files,
        success: "Algum erro aconteceu!"
      })
    }
  },
  async delete(req, res) {

    try {
      await Recipe.delete(req.body.id)

      let results = await Recipe.all()
      let recipes = results.rows

      results = await Recipe.find(req.body.id)
      const recipe = results.rows[0]

      async function getImage(recipeId) {
        let results = await Recipe.files(recipeId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

        return files[0]
      }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })

      recipes = await Promise.all(recipesPromise)

      return res.render('admin/recipes/index', {
        recipes,
        success: "Receita deletada com sucesso!"
      })

    } catch (err) {
      console.error(err)
      return res.render('admin/recipes/edit', {
        recipe,
        error: "Algum erro aconteceu!"
      })
    }
  }
}