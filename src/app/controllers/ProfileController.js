const User = require("../models/User")

module.exports = {
  async index(req, res) {

    try {
      const { userId: id } = req.session
      
      const user = await User.findOne({ where: { id } })
  
      return res.render('admin/profile/index', { user })
      
    } catch (err) {
      console.error(err)
      // return res.redirect('/admin/login')
    }
  },
  async put(req, res) {
    try {
      const { user } = req
      let { name, email } = req.body

      await User.update(user.id, {
        name,
        email
      })

      return res.render('admin/profile/index', {
        user: req.body,
        success: "Conta atualizada com sucesso!"
      })

    } catch (err) {
      console.error(err)
      return res.render('admin/profile/index', {
        error: "Algum erro aconteceu!"
      })
    }
  }
}