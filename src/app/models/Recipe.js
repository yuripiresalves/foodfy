const db = require('../../config/db')
const Base = require('./Base')

Base.init({ table: 'recipes' })

module.exports = {
  ...Base,
  async findAll() {
    try {
      const query = `
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ORDER BY recipes.created_at DESC
      `
      const results = await db.query(query)
      return results.rows

    } catch (err) {
      console.error(err)
    }
  },
  async find(id) {
    try {
      const query = `
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1
      `
      const results = await db.query(query, [id])
      return results.rows[0]

    } catch (err) {
      console.error(err)
    }
  },
  async findByFilter(filter) {
    try {
      const query = `
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        ORDER BY recipes.id ASC
      `
      const results = await db.query(query)
      return results.rows

    } catch (err) {
      console.error(err)
    }
  },
  async chefsSelectOptions() {
    try {
      const results = await db.query(`SELECT name, id FROM chefs`)

      return results.rows

    } catch (err) {
      console.error(err)
    }
  },
  async paginate(params) {
    try {
      const { filter, limit, offset } = params

      let query = "",
        filterQuery = "",
        totalQuery = `(
          SELECT count(*) from recipes
        ) AS total`

      if (filter) {
        filterQuery = `
          WHERE recipes.title ILIKE '%${filter}%'
        `

        totalQuery = `(
          SELECT count(*) from recipes
          ${filterQuery}
        ) AS total`
      }

      query = `
        SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ${filterQuery}
        ORDER BY recipes.updated_at DESC
        LIMIT $1 OFFSET $2
      `

      const results = await db.query(query, [limit, offset])
      return results.rows

    } catch (err) {
      console.error(err)
    }
  },
  async files(id) {
    try {
      const query = `
        SELECT files.* FROM files
        LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
        WHERE recipe_files.recipe_id = $1
      `

      const results = await db.query(query, [id])
      return results.rows

    } catch (err) {
      console.error(err)
    }
  }
}