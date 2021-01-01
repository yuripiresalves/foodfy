const express = require('express')
const routes = express.Router()

// const ProfileController = require('../app/controllers/ProfileController')
const UserController = require('../app/controllers/UserController')

const UserValidator = require('../app/validators/user')

// Rotas de perfil de um usuário logado
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/', UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/register', UserController.registerForm) //
routes.post('/register', UserValidator.post, UserController.post) //Cadastrar um usuário
routes.get('/edit', UserValidator.show, UserController.show) // show
routes.put('/edit', UserValidator.update, UserController.put) // Editar um usuário
// routes.delete('/admin/users', UserController.delete) // Deletar um usuário

module.exports = routes