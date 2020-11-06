var express = require('express');
var router = express.Router();

const db = require('../db')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const text = 'SELECT * FROM users'
  const values = []

  try {
    const data = await db.query(text, values)
    res.send(data.rows)
  } catch (err) {
    console.log(err.stack)
  }
});

router.get('/:id', async (req, res, next) => {
  const text = 'SELECT * FROM users WHERE id = $1'
  const values = [req.params.id]

  try {
    const data = await db.query(text, values)
    res.send(data.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
})

module.exports = router;
