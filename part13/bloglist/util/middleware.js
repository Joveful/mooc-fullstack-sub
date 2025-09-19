const jwt = require('jsonwebtoken');

const { SECRET } = require('../util/config');
const Session = require('../models/session');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: 'invalid token' })
    }
  } else {
    return res.status(401).json({ error: 'missing token' })
  }
  next();
};

const sessionExtractor = async (req, res, next) => {
  const session = await Session.findOne({
    where: {
      user_id: req.decodedToken.id
    }
  });
  if (!session) {
    return res.status(401).json({ error: 'user not logged in' });
  }
  next();
};

module.exports = { tokenExtractor, sessionExtractor }
