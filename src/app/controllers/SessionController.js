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
  }
}