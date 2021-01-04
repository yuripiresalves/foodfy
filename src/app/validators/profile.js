const User = require('../models/User')
const { compare } = require('bcryptjs')

function checkAllFields(body) {
  const keys = Object.keys(body)

  for (key of keys) {
    if (body[key] == "") {
      return {
        user: body,
        error: "Por favor, preencha todos os campos!"
      }
    }
  }
}

async function update(req, res, next) {
  //check if has all fields
  const fillAllFields = checkAllFields(req.body)
  if (fillAllFields) {
    return res.render('admin/profile/index', fillAllFields)
  }

  const { id, email, password } = req.body

  if (!password) return res.render('admin/profile/index', {
    user: req.body,
    error: "Coloque sua senha para atualizar seu cadastro!"
  })

  const user = await User.findOne({ where: { id } })

  if (email !== user.email) {
    const findUserByEmail = await User.findOne({ where: { email } })

    if (findUserByEmail) {
      return res.render('admin/profile/index', {
        user: req.body,
        error: "E-mail já cadastrado por outro usuário!"
      })
    }
  }

  const passed = await compare(password, user.password)

  if (!passed) return res.render('admin/profile/index', {
    user: req.body,
    error: "Senha incorreta!"
  })

  req.user = user

  next()
}

module.exports = {
  update
}