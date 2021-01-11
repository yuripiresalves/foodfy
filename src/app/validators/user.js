const User = require('../models/User')

function checkAllFields(body) {
  const keys = Object.keys(body)

  for (key of keys) {
    if (body[key] == "" && key != "id") {
      return {
        user: body,
        error: "Por favor, preencha todos os campos!"
      }
    }
  }
}

async function show(req, res, next) {
  try {
    const id = req.params.id

    const user = await User.findOne({ where: { id } })

    if (!user) return res.render('/admin/user/edit', {
      error: "Usuário não encontrado!"
    })

    req.user = user

    next()

  } catch (err) {
    console.error(err)
  }
}

async function post(req, res, next) {
  const fillAllFields = checkAllFields(req.body)
  if (fillAllFields) {
    return res.render('admin/user/register', fillAllFields)
  }

  let { email } = req.body

  const user = await User.findOne({
    where: { email }
  })

  if (user) return res.render('admin/user/register', {
    user: req.body,
    error: "Usuário já cadastrado!"
  })

  next()
}

async function update(req, res, next) {
  const fillAllFields = checkAllFields(req.body)
  if (fillAllFields) {
    return res.render('admin/user/index', fillAllFields)
  }

  const { id } = req.body

  if (!id) {
    const users = await User.findAll()
    return res.render('admin/user/index', {
      users,
      error: "Desculpe, algum erro aconteceu. Por favor, tente novamente!"
    })
  }

  const user = await User.findOne({ where: { id } })

  req.user = user

  next()
}

module.exports = {
  post,
  show,
  update
}