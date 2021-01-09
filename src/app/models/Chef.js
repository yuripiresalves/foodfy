const db = require('../../config/db')
const Base = require('./Base') 

Base.init({ table: 'chefs' })

module.exports = {
  ...Base,
  async findAll() {
    try {
      const query = `
        SELECT chefs.*, count(recipes) AS total_recipes, files.path AS avatar
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        LEFT JOIN files ON (files.id = chefs.file_id)
        GROUP BY chefs.id, files.id
        ORDER BY chefs.name ASC
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
      SELECT chefs.*, count(recipes) AS total_recipes,
      (
        SELECT files.path
        FROM chefs
        RIGHT JOIN files ON (files.id = chefs.file_id)
        WHERE chefs.id = $1
      ) AS avatar
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY chefs.id
      `
      const results = await db.query(query, [id])
      return results.rows[0]

    } catch (err) {
      console.error(err)
    }
  },
  async chefRecipes(id) {
    try {
      const query = `
        SELECT recipes.*
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE chefs.id = $1
        ORDER BY recipes.created_at DESC
      `
      const results = await db.query(query, [id])
      return results.rows

    } catch (err) {
      console.error(err)
    }
  }
}