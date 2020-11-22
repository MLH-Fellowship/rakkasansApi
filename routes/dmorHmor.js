var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const db = require('../db')

/* GET dmor_hmor listing. */
router.get('/', async (req, res, next) => {
  const text = 'SELECT * FROM dmor_hmor'
  const values = []

  try {
    const data = await db.query(text, values)
    res.send(data.rows)
  } catch (err) {
    console.log(err.stack)
  }
});

module.exports = router;