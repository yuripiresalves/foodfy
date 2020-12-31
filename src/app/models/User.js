const db = require('../../config/db')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')

module.exports = {
  async create(data) {
    try {
      const query = `
        INSERT INTO users (
          name,
          email,
          password,
          is_admin
        ) VALUES ($1, $2, $3, $4)
        RETURNING id
      `

    const password = crypto.randomBytes(20).toString("hex")

    await mailer.sendMail({
      to: data.email,
      from: 'no-reply@foodfy.com.br',
      subject: 'Senha de login',
      html: `<h2>Aqui está sua senha</h2>
      <p>Para acessar sua conta no Foodfy, utilize a senha: ${password}</p>
      `
    })

    const passwordHash = await hash(password, 8)

    const values = [
      data.name,
      data.email,
      passwordHash,
      data.is_admin || false
    ]

    const results = await db.query(query, values)

    return results.rows[0].id

    } catch (err) {
      console.error(err)
    }
  }
}