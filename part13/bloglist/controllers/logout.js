const { User } = require('../models');
const Session = require('../models/session');
const { tokenExtractor } = require('../util/middleware');

const router = require('express').Router();

router.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    const session = await Session.findOne({
      where: {
        user_id: req.decodedToken.id
      }
    });
    await session.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
