var express = require('express')
var router = express.Router()
const { body, validationResult } = require('express-validator')

const db = require('../db')


router.get('/:batt', async (req, res, next) => {
  const text = `SELECT * FROM battalion`
  const values = []

  try {
    const data = await db.query(text, values)
    res.send(data.rows)
  } catch (err) {
    console.log(err.stack)
  }
})

module.exports = router