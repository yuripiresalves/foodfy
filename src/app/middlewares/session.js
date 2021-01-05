function onlyUsers(req, res, next) {
  if (!req.session.userId)
    return res.redirect('/admin/login')

  next()
}

function onlyUser(req, res, next) {
  if (req.session.userId !== recipes.user_id)
    return res.redirect('/admin/login')

  next()
}

function onlyAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    if (!req.session.userId) {
      return res.redirect('/admin/login')
    }
    else {
      return res.redirect('/admin/profile')
    }
  }

  next()
}

function isLoggedRedirectToUsers(req, res, next) {
  if (req.session.userId)
    return res.redirect('/admin/users')

  next()
}

module.exports = {
  onlyUsers,
  onlyAdmin,
  isLoggedRedirectToUsers
}