const express = require('express')
const routes = express.Router()
const multer = require('../../app/middlewares/multer')

const RecipeController = require('../../app/controllers/RecipeController')

const { onlyUsers, onlyAdmin } = require('../../app/middlewares/session')

routes.get("/recipes", onlyUsers, RecipeController.index)
routes.get("/recipes/create", onlyUsers, RecipeController.create)
routes.get("/recipes/:id", onlyUsers, RecipeController.show)
routes.get("/recipes/:id/edit", onlyUsers, RecipeController.edit)

routes.post("/recipes", onlyUsers, multer.array("photos", 5), RecipeController.post)
routes.put("/recipes", onlyUsers, multer.array("photos", 5), RecipeController.put)
routes.delete("/recipes", onlyUsers, RecipeController.delete)

module.exports = routes