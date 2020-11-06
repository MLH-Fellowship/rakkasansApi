var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const db = require('../db')

router.post('/', [
  body("content").not().isEmpty()
    .trim()
    .escape(),
  body("user_id").not().isEmpty()
    .toInt().isInt(),
  body("post_id").not().isEmpty()
    .toInt().isInt(),
  body("parent_id").toInt()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const text = `
  INSERT INTO comments (content, user_id, parent_id, post_id) 
  VALUES ($1, $2, $3, $4) RETURNING *
  `
  const values = [req.body.content, req.body.user_id, req.body.parent_id, req.body.post_id]

  try {
    const data = await db.query(text, values)
    res.send(data.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
})

module.exports = router;
