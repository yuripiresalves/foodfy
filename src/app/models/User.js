const db = require('../../config/db')

const Base = require('./Base')

Base.init({table: 'users'})

module.exports = {
  ...Base,
  async findAll() {
    try {
      const query = `
        SELECT * FROM users
        ORDER BY name ASC
      `
      const results = await db.query(query)
      return results.rows

    } catch (err) {
      console.error(err)
    }
  }
}