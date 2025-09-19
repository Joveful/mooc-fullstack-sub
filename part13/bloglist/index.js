const express = require('express');
const app = express();

const { PORT } = require('./util/config.js');
const { connectToDatabase } = require('./util/db.js');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const authorRouter = require('./controllers/authors');
const readinglistRouter = require('./controllers/readinglists');

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readinglistRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
    response.status(400).send({ error: error.errors.map(e => e.message) });
  }

  if (error.name === 'ReferenceError') {
    response.status(400).send({ error: 'malformatted input' });
  }

  if (error.name === 'TypeError') {
    response.status(400).send({ error: 'malformatted input' });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    response.status(400).send({ error: error.errors[0].message });
  }

  next(error);
};

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
