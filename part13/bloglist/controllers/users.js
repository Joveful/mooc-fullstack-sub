const router = require('express').Router();

const { User, Blog, Readinglist } = require('../models');

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({
    where: {
      username: req.params.username
    }
  });
  next();
};

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  });
  res.json(users);
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let where = { id: req.params.id };

    if (req.query.read) {
      where = {
        ...where,
        read: req.query.read
      }
    }

    const user = await User.findOne({
      where,
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: Blog,
          as: 'readings',
          attributes: { exclude: ['userId', 'createdAt', 'updatedAt', 'readinglist'] },
          through: {
            attributes: []
          },
          include: {
            model: Readinglist,
            attributes: { exclude: ['blogId', 'userId'] }
          }
        },
      ]
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:username', userFinder, async (req, res, next) => {
  if (req.user) {
    req.user.username = req.body.username;
    await req.user.save();
    res.json(req.user);
  } else {
    next(error);
  }
});

module.exports = router;
