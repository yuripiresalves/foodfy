const { unlinkSync } = require('fs')

const Chef = require('../models/Chef')
const File = require('../models/File')

const LoadChefService = require('../services/LoadChefService')

module.exports = {
  async index(req, res) {
    try {
      const chefs = await LoadChefService.load('chefs')

      if (!chefs) return res.render('admin/parts/not-found')

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
      const { name } = req.body

      const { filename, path } = req.files[0]
      const file_id = await File.create({ name: filename, path })

      await Chef.create({ name, file_id })

      let chef = req.body
      chef.file_id = file_id

      return res.render('admin/chefs/edit', {
        chef,
        avatar: req.files[0].path.replace('public', ''),
        success: "Chef criado com sucesso!"
      })

    } catch (err) {
      console.error(err)
      return res.render('admin/chefs/create', {
        error: "Desculpe, algum erro aconteceu. Tente novamente!"
      })
    }
  },
  async show(req, res) {
    try {
      const chef = await LoadChefService.load('chef', req.params.id)

      if (!chef) return res.render('admin/parts/not-found')

      const recipes = await LoadChefService.load('chefRecipes', chef.id)

      return res.render('admin/chefs/show', { chef, recipes })

    } catch (err) {
      console.error(err)
    }
  },
  async edit(req, res) {
    try {
      const chef = await LoadChefService.load('chef', req.params.id)

      if (!chef) return res.render('admin/parts/not-found')

      return res.render('admin/chefs/edit', { chef, avatar: chef.avatar })

    } catch (err) {
      console.error(err)
    }
  },
  async put(req, res) {
    try {
      let chef = await LoadChefService.load('chef', req.body.id)

      if (req.files.length != 0) {
        const { filename, path } = req.files[0]
        file_id = await File.create({ name: filename, path })
      } else {
        file_id = chef.file_id
      }

      await Chef.update(req.body.id, {
        name: req.body.name,
        file_id
      })

      if (req.body.removed_files) {
        const removedFileId = req.body.removed_files.replace(',', '')
        const file = await File.findOne({ where: { id: removedFileId } })
        await File.delete(removedFileId)
        if (!file.path.includes('_placeholder')) {
          try {
            unlinkSync(file.path)
          } catch (err) {
            console.error(err)
          }
        }
      }

      chef = await LoadChefService.load('chef', req.body.id)

      return res.render('admin/chefs/edit', {
        chef: req.body,
        avatar: chef.avatar,
        success: "Chef atualizado com sucesso!"
      })

    } catch (err) {
      console.error(err)
      const chef = await LoadChefService.load('chef', req.body.id)

      return res.render('admin/chefs/edit', {
        chef: req.body,
        avatar: chef.avatar,
        error: "O chef precisa ter uma imagem!"
      })
    }
  },
  async delete(req, res) {
    try {
      const recipes = await LoadChefService.load('chefRecipes', req.body.id)

      if (recipes.length == 0) {
        const file = await File.findOne({ where: { id: req.body.file_id } })

        await Chef.delete(req.body.id)

        if (!file.path.includes('_placeholder')) {
          File.delete(file.id)
          try {
            unlinkSync(file.path)
          } catch (err) {
            console.error(err)
          }
        }

        const chefs = await LoadChefService.load('chefs')

        return res.render('admin/chefs/index', {
          chefs,
          success: "Chef deletado com sucesso!"
        })

      } else {
        const chef = await LoadChefService.load('chef', req.body.id)

        return res.render('admin/chefs/edit', {
          chef,
          avatar: chef.avatar,
          error: "Não é possível deletar este chef pois ele possui pelo menos uma receita!"
        })
      }
    }
    catch (err) {
      console.error(err)
      const chefs = await LoadChefService.load('chefs')

        return res.render('admin/chefs/index', {
          chefs,
          error: "Desculpe, algum erro aconteceu. Por favor, tente novamente!"
        })
    }
  }
}