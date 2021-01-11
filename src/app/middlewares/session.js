function onlyUsers(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/admin/login')
  }

  next()
}

function onlyAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    return res.redirect('/admin/profile')
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