var express = require('express');
var router = express.Router();
const { body, param, validationResult } = require('express-validator');

const db = require('../db')

router.get('/', async (req, res, next) => {
  const text =
    `
    SELECT posts.*, users.first_name, users.last_name
    FROM posts 
    JOIN users ON posts.user_id = users.id
    `
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
  body("body").not().isEmpty()
    .trim()
    .escape(),
  body("user_id").not().isEmpty()
    .toInt().isInt(),
  body("topic_id").toInt()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const text = 'INSERT INTO posts (title, body, user_id, topic_id) VALUES ($1, $2, $3, $4) RETURNING *'
  const values = [req.body.title, req.body.body, req.body.user_id, req.body.topic_id]

  try {
    const data = await db.query(text, values)
    res.send(data.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
})

router.delete('/:id/', async (req, res, next) => {
  const id = req.params.id

  try {
    const data = await db.query('DELETE FROM posts WHERE id=$1', [id])
    return res.json({message: "Post successfully deleted"})
  } catch (err) {
    console.log(err.stack)
  }
});

router.post('/:id/comments', [
  body("content").not().isEmpty()
    .trim()
    .escape(),
  body("user_id").not().isEmpty()
    .toInt().isInt(),
  body("parent_id").isInt().optional({ nullable: true })
], async (req, res, next) => {
  param("id").not().isEmpty()
    .toInt().isInt();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const text = `
  INSERT INTO comments (content, user_id, parent_id, post_id) 
  VALUES ($1, $2, $3, $4) RETURNING *
  `
  const values = [req.body.content, req.body.user_id, req.body.parent_id, req.params.id]

  try {
    const data = await db.query(text, values)
    res.send(data.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
})

router.get('/:id', async (req, res, next) => {
  const text = 'SELECT * FROM posts WHERE id = $1'
  const values = [req.params.id]

  try {
    const data = await db.query(text, values)
    res.send(data.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
})

router.get('/:id/comments', async (req, res, next) => {
  const text = `
    SELECT comments.*
    FROM posts 
    JOIN comments ON comments.post_id = posts.id
    WHERE posts.id = $1
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
