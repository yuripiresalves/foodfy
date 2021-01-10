const { unlinkSync } = require('fs')

const Recipe = require('../models/Recipe')
const File = require('../models/File')
const RecipeFile = require('../models/RecipeFile')

const LoadRecipeService = require('../services/LoadRecipeService')

async function getImages(recipeId) {
  let files = await Recipe.files(recipeId)
  files = files.map(file => ({
    ...file,
    src: `${file.path.replace("public", "")}`
  }))

  return files
}

module.exports = {
  async index(req, res) {
    try {
      const recipes = await LoadRecipeService.load('recipes')

      if (!recipes) return res.render('admin/not-found')

      return res.render('admin/recipes/index', { recipes })

    } catch (err) {
      console.error(err)
    }
  },
  async create(req, res) {
    try {
      const chefOptions = await Recipe.chefsSelectOptions()

      return res.render('admin/recipes/create', { chefOptions })

    } catch (err) {
      console.error(err)
    }
  },
  async post(req, res) {
    try {
      const {
        chef_id,
        title,
        ingredients,
        preparation,
        information
      } = req.body

      const recipe_id = await Recipe.create({
        chef_id,
        user_id: req.session.userId,
        title,
        ingredients: `{${ingredients}}`,
        preparation: `{${preparation}}`,
        information
      })

      const filesPromise = req.files.map(async file => {
        await RecipeFile.createRecipeFile({ ...file, recipe_id })
      })

      await Promise.all(filesPromise)

      const files = await getImages(recipe_id)

      const chefOptions = await Recipe.chefsSelectOptions()

      return res.render('admin/recipes/edit', {
        recipe: req.body,
        chefOptions,
        files,
        success: "Receita cadastrada com sucesso!"
      })

    } catch (err) {

      console.error(err)
      return res.render('admin/recipes/create', {
        error: "Erro ao cadstrar receita. Por favor, tente novamente!"
      })
    }
  },
  async show(req, res) {
    try {
      const recipe = await LoadRecipeService.load('recipe', req.params.id)

      if (!recipe) return res.render('admin/not-found')

      return res.render('admin/recipes/show', { recipe })

    } catch (err) {
      console.error(err)
    }
  },
  async edit(req, res) {
    try {
      const recipe = await LoadRecipeService.load('recipe', req.params.id)

      if (!recipe) return res.render('admin/not-found')

      const chefOptions = await Recipe.chefsSelectOptions()

      const files = await getImages(recipe.id)

      return res.render('admin/recipes/edit', { recipe, chefOptions, files })

    } catch (err) {
      console.error(err)
    }
  },
  async put(req, res) {
    try {
      let {
        id,
        chef_id,
        title,
        ingredients,
        preparation,
        information,
        removed_files
      } = req.body

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map(async file =>
          await RecipeFile.createRecipeFile({ ...file, recipe_id: id }))

        await Promise.all(newFilesPromise)
      }

      if (removed_files) {
        removed_files = removed_files.split(',')
        const lastIndex = removed_files.length - 1
        removed_files.splice(lastIndex, 1)

        const removedFilesPromise = removed_files.map(async id => {
          RecipeFile.delete( id )

          const file = await File.findOne({ where: { id } })
          File.delete( id )
          if (file.path != 'public/images/recipe_placeholder.png') {
            try {
              unlinkSync(file.path)
            } catch (err) {
              console.error(err)
            }
          }
        })

        await Promise.all(removedFilesPromise)
      }

      await Recipe.update(id, {
        chef_id,
        title,
        ingredients: `{${ingredients}}`,
        preparation: `{${preparation}}`,
        information
      })

      const files = await getImages(id)
      const chefOptions = await Recipe.chefsSelectOptions()

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
        error: "Algum erro aconteceu!"
      })
    }
  },
  async delete(req, res) {

    try {
      const files = await Recipe.files(req.body.id)

      await Recipe.delete(req.body.id)

      files.map(file => {
        if (file.path != 'public/images/recipe_placeholder.png') {
          try {
            unlinkSync(file.path)
          } catch (err) {
            console.error(err)
          }
        }
      })

      const recipes = await LoadRecipeService.load('recipes')
      
      return res.render('admin/recipes/index', {
        recipes,
        success: "Receita deletada com sucesso!"
      })
      
    } catch (err) {
      console.error(err)
      const recipes = await LoadRecipeService.load('recipes')

      return res.render('admin/recipes/index', {
        recipes,
        error: "Desculpe, algum erro aconteceu. Por favor, tente novamente!"
      })
    }
  }
}