const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(callback) {

    db.query(`
    SELECT recipes.*, chefs.name AS chef_name 
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    ORDER BY recipes.id ASC`, (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })

  },
  create(data, callback) {
    const query = `
      INSERT INTO recipes (
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at,
        chef_id
      ) VALUES ($1, $2 ,$3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.chef
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  findBy(filter, callback) {
    db.query(`
    SELECT recipes.*, chefs.name AS chef_name 
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.title ILIKE '%${filter}%'
    ORDER BY recipes.id ASC`, (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET
        image=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5),
        chef_id=($6)
      WHERE id = $7
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`

      return callback()
    })
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params

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
    ORDER BY recipes.id ASC
    LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  }
}