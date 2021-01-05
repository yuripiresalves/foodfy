const User = require('../models/User')
const { compare } = require('bcryptjs')

async function login(req, res, next) {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  if (!user) return res.render('admin/session/login', {
    user: req.body,
    error: "Usuário não cadastrado!"
  })

  // const passed = await compare(password, user.password)
  const passed = password == user.password ? true : false


  if (!passed) return res.render('admin/session/login', {
    user: req.body,
    error: "Senha incorreta!"
  })

  req.user = user

  next()
}

async function forgot(req, res, next) {
  const { email } = req.body

  try {
    let user = await User.findOne({ where: { email } })

    if (!user) return res.render('admin/session/forgot-password', {
      user: req.body,
      error: "E-mail não cadastrado!"
    })

    req.user = user

    next()

  } catch (err) {
    console.error(err)
  }

}

module.exports = {
  login,
  forgot
}