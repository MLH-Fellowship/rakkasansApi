var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const db = require('../db')

router.get('/', async (req, res, next) => {
  const text = 'SELECT * FROM topics;'
  const values = []

  try {
    const data = await db.query(text, values)
    res.send(data.rows)
  } catch (err) {
    console.log(err.stack)
  }
});

router.post('/', [
  body("title").not().isEmpty()
    .trim()
    .escape(),
  body("user_id").not().isEmpty()
    .toInt().isInt()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const text = `
    INSERT INTO topics (title, user_id) 
    VALUES ($1, $2)
    RETURNING *
  `
  const values = [req.body.title, req.body.user_id]

  try {
    const data = await db.query(text, values)
    res.send(data.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
})

router.get('/:id', async (req, res, next) => {
  const text = 'SELECT * FROM topics WHERE id = $1'
  const values = [req.params.id]

  try {
    const data = await db.query(text, values)
    res.send(data.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
})

router.get('/:id/posts', async (req, res, next) => {
  const text = `
    SELECT posts.*, users.*
    FROM topics
    JOIN posts ON posts.topic_id = topics.id
    JOIN users ON posts.user_id = users.id
    WHERE topics.id = $1
  `
  const values = [req.params.id]

  try {
    const data = await db.query(text, values)
    res.send(data.rows)
  } catch (err) {
    console.log(err.stack)
  }
})


module.exports = router;
