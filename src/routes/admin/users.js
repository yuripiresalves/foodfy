const express = require('express')
const routes = express.Router()

const UserController = require('../../app/controllers/UserController')

const UserValidator = require('../../app/validators/user')

const { onlyAdmin } = require('../../app/middlewares/session')

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', onlyAdmin, UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/users/register', onlyAdmin, UserController.registerForm) //
routes.post('/users/register', onlyAdmin, UserValidator.post, UserController.post) //Cadastrar um usuário
routes.get('/users/:id/edit', onlyAdmin, UserValidator.show, UserController.show) // show
routes.put('/users', onlyAdmin, UserValidator.update, UserController.put) // Editar um usuário
routes.delete('/users', UserController.delete) // Deletar um usuário

module.exports = routes