const db = require('../../config/db')

const Base = require('./Base')

Base.init({table: 'users'})

const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')
const fs = require('fs')

const Recipe = require('../models/Recipe')

module.exports = {
  ...Base,
  async all() {
    try {
      return db.query(`
        SELECT * FROM users
        ORDER BY name ASC
      `)
    } catch (err) {
      console.error(err)
    }
  },
  async findOne(filters) {
    let query = "SELECT * FROM users"

    Object.keys(filters).map(key => {
      //WHERE | OR
      query = `
        ${query}
        ${key}
      `

      Object.keys(filters[key]).map(field => {
        query = `${query} ${field} = '${filters[key][field]}'`
      })
    })

    const results = await db.query(query)

    return results.rows[0]
  },
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
      
    const values = [
      data.name,
      data.email,
      data.password,
      data.is_admin || false
    ]

    const results = await db.query(query, values)

    return results.rows[0].id

    } catch (err) {
      console.error(err)
    }
  },
  async update(id, fields) {
    let query = "UPDATE users SET"

    Object.keys(fields).map((key, index, array) => {
      if((index + 1) < array.length) {
        query = `
          ${query}
          ${key} = '${fields[key]}',
        `

      } else {
        // last iteration
        query = `
          ${query}
          ${key} = '${fields[key]}'
          WHERE id = ${id}
        `
      }
    })

    await db.query(query)
    return 
  },
  async delete(id) {
    let results = await db.query('SELECT * FROM recipes WHERE user_id = $1', [id])
    const recipes = results.rows

    // dos produtos, pegar todas as imagens
    const allFilesPromise = recipes.map(recipe => 
      Recipe.files(recipe.id))

    let promiseResults = await Promise.all(allFilesPromise)

    // rodar a remoção do usuário
    await db.query('DELETE FROM users WHERE id = $1', [id])

    // romover as imagens da pasta public
    promiseResults.map(results => {
      results.rows.map(file => {
        try {
          fs.unlinkSync(file.path)
        } catch (err) {
          console.error(err)
        }
      })
    })
  }
}