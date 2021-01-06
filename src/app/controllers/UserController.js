const User = require("../models/User")

module.exports = {
  async list(req, res) {
    try {
      let results = await User.all()
      const users = results.rows

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
      await User.create(req.body)

      return res.redirect('/admin/users')

    } catch (err) {
      console.error(err)
    }
  },
  async put(req, res) {
    try {
      const { user } = req
      let { name, email, is_admin } = req.body

      if (is_admin !== true) {
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
        error: "Algum erro aconteceu!"
      })
    }
  },
  async delete(req, res) {
    try {
      await User.delete(req.body.id)

      return res.render('admin/user/register', {
        success: "Conta deletada com sucesso!"
      })
    } catch (err) {
      console.error(err)
      return res.render('admin/user/edit', {
        user: req.body,
        error: "Erro ao tentar deletar a conta!"
      })
    }
  }
}