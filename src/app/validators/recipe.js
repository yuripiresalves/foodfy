const Recipe = require('../models/Recipe')

const LoadRecipeService = require('../services/LoadRecipeService')

async function getImages(recipeId) {
  let files = await Recipe.files(recipeId)
  files = files.map(file => ({
    ...file,
    src: `${file.path.replace("public", "")}`
  }))

  return files
}

async function post(req, res, next) {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "" && key != "information") {
      return res.send("Por favor, volte e preencha todos os campos!")
    }
  }

  if (!req.files || req.files.length == 0)
    return res.send('Por favor, envie pelo menos uma imagem!')

  next()
}

async function edit(req, res, next) {
  const recipe = await LoadRecipeService.load('recipe', req.params.id)

  if (!recipe) return res.render('admin/not-found')

  const files = await getImages(recipe.id)

  if (recipe.user_id !== req.session.userId && !req.session.isAdmin) return res.render(`admin/recipes/show`, {
    recipe,
    files,
    error: "Você não pode editar esta receita!"
  })

  next()
}

async function put(req, res, next) {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "" && key != "removed_files" && key != "information") {
      return res.send("Por favor, volte e preencha todos os campos!")
    }
  }

  next()
}

module.exports = {
  post,
  edit,
  put
}