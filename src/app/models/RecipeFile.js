const db = require('../../config/db')

const Base = require('./Base') 

Base.init({ table: 'recipe_files' })

module.exports = {
  ...Base,
  async createRecipeFile({ filename, path, recipe_id }) {
    try {
      let query = `
        INSERT INTO files (
          name,
          path
        ) VALUES ($1, $2)
        RETURNING id
      `

      let values = [
        filename,
        path
      ]

      const results = await db.query(query, values)
      const fileId = results.rows[0].id

      query = `
        INSERT INTO recipe_files (
          recipe_id,
          file_id
        ) VALUES ($1, $2)
        RETURNING id
      `

      values = [
        recipe_id,
        fileId
      ]

      return db.query(query, values)

    } catch (err) {
      console.error(err)
    }
  },
}