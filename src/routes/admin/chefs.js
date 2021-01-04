const express = require('express')
const routes = express.Router()
const multer = require('../../app/middlewares/multer')

const ChefController = require('../../app/controllers/ChefController')

const { onlyUsers, onlyAdmin } = require('../../app/middlewares/session')

routes.get("/chefs", onlyUsers, ChefController.index)
routes.get("/chefs/create", onlyAdmin, ChefController.create)
routes.get("/chefs/:id", onlyUsers, ChefController.show)
routes.get("/chefs/:id/edit", onlyAdmin, ChefController.edit)

routes.post("/chefs", multer.array("photos", 1), onlyAdmin, ChefController.post)
routes.put("/chefs", multer.array("photos", 1), onlyAdmin, ChefController.put)
routes.delete("/chefs", onlyAdmin, ChefController.delete)

module.exports = routes