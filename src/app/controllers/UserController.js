const User = require("../models/User")

const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')

module.exports = {
  async list(req, res) {
    try {
      const users = await User.findAll()

      return res.render('admin/user/index', { users })

    } catch (err) {
      console.error(err)
    }
  },
  registerForm(req, res) {
    return res.render('admin/user/register')
  },
  show(req, res) {
    const { user } = req

    return res.render('admin/user/edit', { user })
  },
  async post(req, res) {
    try {
      let { name, email, is_admin } = req.body

      is_admin = is_admin || false

      const password = crypto.randomBytes(3).toString("hex")

      await mailer.sendMail({
        to: email,
        from: 'no-reply@foodfy.com.br',
        subject: 'Senha de login',
        html: `<h2>Bem-vindo ao Foodfy, ${name}</h2>
          <p>Para acessar a sua conta, utilize as seguintes credenciais:</p>
          <p><strong>E-mail</strong>: ${email}</p>
          <p><strong>Senha</strong>: ${password}</p>
        `
      })

      const passwordHash = await hash(password, 8)

      await User.create({
        name,
        email,
        password: passwordHash,
        is_admin
      })

      return res.render('admin/user/edit', {
        user: req.body,
        success: "Usuário cadastrado com sucesso!"
      })

    } catch (err) {
      console.error(err)
    }
  },
  async put(req, res) {
    try {
      const { user } = req
      let { name, email, is_admin } = req.body

      if (is_admin != true) {
        is_admin = false
      }

      await User.update(user.id, {
        name,
        email,
        is_admin
      })

      return res.render('admin/user/edit', {
        user: req.body,
        success: "Conta atualizada com sucesso!"
      })

    } catch (err) {
      console.error(err)
      return res.render('admin/user/edit', {
        user: req.body,
        error: "Algum erro aconteceu!"
      })
    }
  },
  async delete(req, res) {
    try {
      await User.delete(req.body.id)

      const users = await User.findAll()

      return res.render('admin/user/index', {
        users,
        success: "Conta deletada com sucesso!"
      })
    } catch (err) {
      console.error(err)
      const users = await User.findAll()

      return res.render('admin/user/index', {
        users,
        error: "Erro ao tentar deletar a conta!"
      })
    }
  }
}