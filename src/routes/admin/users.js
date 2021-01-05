const express = require('express')
const routes = express.Router()

const UserController = require('../../app/controllers/UserController')
const SessionController = require('../../app/controllers/SessionController')

const UserValidator = require('../../app/validators/user')
const SessionValidator = require('../../app/validators/session')

const { onlyUsers, onlyAdmin, isLoggedRedirectToUsers } = require('../../app/middlewares/session')



// login/logout
routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// password
routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', onlyAdmin, UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/users/register', onlyAdmin, UserController.registerForm) //
routes.post('/users/register', onlyAdmin, UserValidator.post, UserController.post) //Cadastrar um usuário
routes.get('/users/:id/edit', onlyAdmin, UserValidator.show, UserController.show) // show
routes.put('/users/:id/edit', onlyAdmin, UserValidator.update, UserController.put) // Editar um usuário
// routes.delete('/admin/users', UserController.delete) // Deletar um usuário

module.exports = routes