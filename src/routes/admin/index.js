const express = require('express')
const routes = express.Router()

// const sessionRoutes = require('./session')
const userRoutes = require('./users')
const profileRoutes = require('./profile')
const recipeRoutes = require('./recipes')
const chefRoutes = require('./chefs')

routes.use(
  // sessionRoutes,
  // authMiddleware,
  userRoutes,
  profileRoutes,
  recipeRoutes,
  chefRoutes
);

module.exports = routes