const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { Blog, User } = require('../models');
const { SECRET } = require('../util/config');
const { Op } = require('sequelize');
const { tokenExtractor } = require('../util/middleware');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search
          }
        },
        {
          author: {
            [Op.substring]: req.query.search
          }
        }]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ],
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, likes: 0, userId: user.id });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    if (req.blog.userId === req.decodedToken.id) {
      await req.blog.destroy();
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
