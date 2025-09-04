const express = require('express');
const app = express();

const { PORT } = require('./util/config.js');
const { connectToDatabase } = require('./util/db.js');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/authors');

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
    response.status(400).send({ error: error.errors.map(e => e.message) });
  }

  if (error.name === 'ReferenceError') {
    response.status(400).send({ error: 'malformatted input' });
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
