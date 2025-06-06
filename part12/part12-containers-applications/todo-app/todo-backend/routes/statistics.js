const express = require('express');
const router = express.Router();
const redis = require('../redis');

router.get('/', async (_req, res) => {
  const todos = await redis.getAsync('added_todos')
  res.send({ "added_todos": Number(todos) })
});

module.exports = router;
