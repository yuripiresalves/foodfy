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
  async recipe() {
    try {
      const recipe = await Recipe.find(this.filter)
      recipe.files = await getImages(recipe.id)
      return recipe

    } catch (error) {
      console.error(error)
    }
  },
  async recipes() {
    try {
      let recipes = await Recipe.paginate(this.filter)

      const recipesPromise = recipes.map(async recipe => {
        const files = await getImages(recipe.id)

        if (files.length != 0) {
          recipe.image = files[0].src
        } else {
          recipe.image = 'http://placehold.it/940x280?text=Receita sem imagem'
        }

        return recipe
      })

      const allRecipes = await Promise.all(recipesPromise)
      return allRecipes

    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = LoadService