const mariadb = require('mariadb')
 
require('dotenv').config()

module.exports = function db() {
  // Connect to our MariaDB database.
  const pool = mariadb.createPool({ 
    host: 'plesk.remote.ac',
    user: 'WS325813_atw2_user',
    password: process.env.DB_PASSWORD,
    database: 'WS325813_atw2'
   })
  
  async function insertStartingEleven(userId, startingEleven) {
    let conn 
    try {
      conn = await pool.getConnection()
      const { insertId } = await conn.query('INSERT INTO StartingEleven (userId, startingElevenJSON) VALUES (?, ?)', [ userId, JSON.stringify(startingEleven) ])   
      return parseInt(insertId)
    } 
    catch (err) {
      throw err 
    } 
    finally {
      if (conn) conn.end()
    }
  }

  async function getStartingElevens(userId) {
    let conn 
    try {
      conn = await pool.getConnection()
      const rows = await conn.query('SELECT startingElevenId, lastEdit, startingElevenJSON FROM StartingEleven WHERE userId = ? LIMIT 1000', [ userId ])

      return rows.map(({ startingElevenId, lastEdit, startingElevenJSON }) => ({
          id: startingElevenId,
          lastEdit,
          ...(JSON.parse(startingElevenJSON))
        }
      ))
    }
    catch (err) {
      throw err
    }
    finally {
      if (conn) conn.end()
    }
  }

  async function deleteStartingEleven(startingElevenId) {
    let conn 
    try {
      conn = await pool.getConnection()
      await conn.query('DELETE FROM StartingEleven WHERE startingElevenId = ?', [ startingElevenId ])
    }
    catch (err) {
      throw err
    }
    finally {
      if (conn) conn.end()
    }
  }

  return {
    insertStartingEleven,
    getStartingElevens,
    deleteStartingEleven
  }
}
