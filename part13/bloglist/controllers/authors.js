const { Blog } = require('../models');
const { sequelize } = require('../util/db');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('SUM', sequelize.col('likes')), 'total_likes'],
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
    ],
    group: 'author'
  })
  res.json(authors);
})

module.exports = router;
