const { findRecipesByChef } = require('../models/Chef')
const Chef = require('../models/Chef')
const File = require('../models/File')
const Recipe = require('../models/Recipe')

module.exports = {
  async index(req, res) {

    try {
      const results = await Chef.all()
      const chefs = results.rows

      if (!chefs) return res.render('not-found')

      async function getImage(chefId) {
        let results = await Chef.files(chefId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

        return files[0]
      }

      const chefsPromise = chefs.map(async chef => {
        chef.image = await getImage(chef.id)
        return chef
      })

      const lastAdded = await Promise.all(chefsPromise)

      return res.render('admin/chefs/index', { chefs: lastAdded })

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
      const chef = results.rows[0]

      results = await Chef.files(chef.id)
      let files = results.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render('admin/chefs/edit', {
        chef: req.body,
        files,
        success: "Chef criado com sucesso!"
      })

    } catch (err) {
      console.error(err)
    }
  },
  async show(req, res) {

    try {
      const id = req.params.id

      let result = await Chef.find(id)
      const chef = result.rows[0]

      if (!chef) return res.render('not-found')

      result = await Chef.files(chef.id)
      const files = result.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      result = await findRecipesByChef(id)
      const recipes = result.rows

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

      return res.render('admin/chefs/show', { chef, recipes: lastAdded, files })

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
      let results = await Chef.find(req.body.id)
      const chef = results.rows[0]

      if (req.files.length != 0) {
        const newFilesPromise = req.files.map(file =>
          File.create({ ...file }))

        results = await newFilesPromise[0]
        let id = results.rows[0].id
      } else {
        id = chef.file_id
      }

      await Chef.update(req.body, id)

      if (req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(",")
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)

        const removedFilesPromise = removedFiles.map(id => File.delete(id))

        await Promise.all(removedFilesPromise)

      }

      results = await Chef.files(chef.id)
      let files = results.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render('admin/chefs/edit', {
        chef: req.body,
        files,
        success: "Chef atualizado com sucesso!"
      })

    } catch (err) {
      console.error(err)
      return res.render('admin/chefs/edit', {
        chef: req.body,
        files,
        error: "Algum erro aconteceu!"
      })
    }
  },
  async delete(req, res) {

    try {
      const id = req.body.id

      let results = await Chef.find(id)
      const chef = results.rows[0]

      results = await Chef.findRecipesByChef(id)
      const recipes = results.rows

      results = await Chef.files(chef.id)
      let files = results.rows
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      if (recipes.length == 0) {
        result = await Chef.delete(id)

        async function getImage(chefId) {
          let results = await Chef.files(chefId)
          const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
  
          return files[0]
        }

        results = await Chef.all()
        let chefs = results.rows
  
        const chefsPromise = chefs.map(async chef => {
          chef.image = await getImage(chef.id)
          return chef
        })
  
        chefs = await Promise.all(chefsPromise)

        return res.render('admin/chefs/index', {
          chefs,
          success: "Chef deletado com sucesso!"
        })
      }
      else
        return res.render('admin/chefs/edit', {
          chef,
          files,
          error: "Não é possível deletar este chef pois ele possui pelo menos uma receita!"
        })
    }
    catch (err) {
      console.error(err)
    }
  }
}