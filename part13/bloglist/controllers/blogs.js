const router = require('express').Router();

const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);

});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(400).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Blog.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(204);
  } catch (error) {
    res.status(400).end();
  }
});

module.exports = router;
