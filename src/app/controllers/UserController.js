const User = require("../models/User")

module.exports = {
  registerForm(req, res) {
    return res.render('admin/user/register')
  },
  async post(req, res) {
    const userId = await User.create(req.body)

    return res.redirect('/admin/users/register')
  }
}