var express = require('express')
var router = express.Router()
const { body, validationResult } = require('express-validator')

const db = require('../db')


router.get('/:batt', async (req, res, next) => {
  const query = {
    name: `fetch-battalion`,
    text: `SELECT * FROM battalion WHERE batt_name = $1`,
    values: [req.params.batt],
  }

  try {
    const data = await db.query(query)
    res.send(data.rows)
  } catch (err) {
    console.log(err.stack)
  }
})

router.get('/:batt/shops', async (req, res, next) => {
  const query = {
    name: `fetch-battalion`,
    text: `SELECT * FROM shops WHERE batt_name = $1`,
    values: [req.params.batt],
  }

  try {
    const data = await db.query(query)
    res.send(data.rows)
  } catch (err) {
    console.log(err.stack)
  }
})

module.exports = router