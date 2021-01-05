const User = require('../models/User')

const { hash } = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')

module.exports = {
  loginForm(req, res) {
    return res.render('admin/session/login')
  },
  login(req, res) {

    try {
      req.session.userId = req.user.id
      req.session.isAdmin = req.user.is_admin

      return res.redirect('/admin/users')

    } catch (err) {
      console.error(err)
    }
  },
  logout(req, res) {

    try {
      req.session.destroy()

      return res.redirect('/admin/login')

    } catch (err) {
      console.error(err)
    }
  },
  forgotForm(req, res) {
    return res.render('admin/session/forgot-password')
  },
  async forgot(req, res) {
    const user = req.user

    try {
      const token = crypto.randomBytes(20).toString("hex")

      let now = new Date()
      now = now.setHours(now.getHours() + 1)

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now
      })

      await mailer.sendMail({
        to: user.email,
        from: 'no-reply@foodfy.com.br',
        subject: 'Recuperação de senha',
        html: `<h2>Perdeu a chave?</h2>
        <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
        <p>
          <a href="http://localhost:5000/admin/password-reset?token=${token}" target=_blank>
            RECUPERAR SENHA
          </a>
        </p>
        `
      })

      return res.render('admin/session/forgot-password', {
        success: "Verifique seu e-mail para resetar sua senha!"
      })

    } catch (err) {
      console.error(err)
      return res.render('admin/session/forgot-password', {
        error: "Erro inesperado, tente novamente!"
      })
    }
  },
  resetForm(req, res) {
    return res.render('admin/session/password-reset', { token: req.query.token })
  },
  async reset(req, res) {
    const user = req.user

    const { password, token } = req.body

    try {
      const newPassword = await hash(password, 8)

      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: ""
      })

      return res.render('admin/session/login', {
        user: req.body,
        success: "Senha atualizada! Faça o seu login!"
      })
      
    } catch (err) {
      console.error(err)
      return res.render('admin/session/password-reset', {
        user: req.body,
        token,
        error: "Erro inesperado, tente novamente!"
      })
    }
  }
}