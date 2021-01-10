const Chef = require('../models/Chef')
const File = require('../models/File')
const Recipe = require('../models/Recipe')

async function getImages(recipeId) {
  let files = await Recipe.files(recipeId)
  files = files.map(file => ({
    ...file,
    src: `${file.path.replace("public", "")}`
  }))

  return files
}

const LoadService = {
  load(service, filter) {
    this.filter = filter
    return this[service]()
  },
  formatChef(chef) {
    return {
      ...chef,
      total_recipes: chef.total_recipes,
      avatar: chef.avatar.replace('public', '')
    }
  },
  async chef() {
    try {
      const chef = await Chef.find(this.filter)

      return this.formatChef(chef)

    } catch (error) {
      console.error(error)
    }
  },
  async chefs() {
    try {
      let chefs = await Chef.findAll()
      chefs = chefs.map(this.formatChef)

      return chefs

    } catch (error) {
      console.error(error)
    }
  },
  async chefRecipes() {
    try {
      let chefRecipes = await Chef.chefRecipes(this.filter)

      const recipesPromise = chefRecipes.map(async recipe => {
        const files = await getImages(recipe.id)
        if (files[0]) {
          recipe.image = files[0].src
        } else {
          recipe.image = 'http://placehold.it/940x280?text=Receita sem foto'
        }
        return recipe
      })

      chefRecipes = await Promise.all(recipesPromise)

      return chefRecipes

    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = LoadService