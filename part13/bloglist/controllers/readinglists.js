const router = require('express').Router();

const { Op } = require('sequelize');
const { Readinglist } = require('../models');
const { tokenExtractor } = require('../util/middleware');

const readinglistFinder = async (req, res, next) => {
  req.readinglists = await Readinglist.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const rlist = await Readinglist.findAll({});
  res.json(rlist);
});

router.put('/:id', tokenExtractor, readinglistFinder, async (req, res, next) => {
  try {
    if (req.readinglists.userId === req.decodedToken.id) {
      req.readinglists.read = true;
      await req.readinglists.save();
      res.json(req.readinglists);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
