const express = require('express')
const routes = express.Router()
const multer = require('../../app/middlewares/multer')

const RecipeController = require('../../app/controllers/RecipeController')

const { onlyUsers } = require('../../app/middlewares/session')

const Validator = require('../../app/validators/recipe')

routes.get("/recipes", onlyUsers, RecipeController.index)
routes.get("/recipes/my-recipes", onlyUsers, RecipeController.userRecipes)
routes.get("/recipes/create", onlyUsers, RecipeController.create)
routes.get("/recipes/:id", onlyUsers, RecipeController.show)
routes.get("/recipes/:id/edit", onlyUsers, Validator.edit, RecipeController.edit)

routes.post("/recipes", onlyUsers, multer.array("photos", 5), Validator.post, RecipeController.post)
routes.put("/recipes", onlyUsers, multer.array("photos", 5), Validator.put, RecipeController.put)
routes.delete("/recipes", onlyUsers, RecipeController.delete)

module.exports = routes