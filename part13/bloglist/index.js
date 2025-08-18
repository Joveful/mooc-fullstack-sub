const express = require('express');
const app = express();

const { PORT } = require('./util/config.js');
const { connectToDatabase } = require('./util/db.js');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log(error.name);
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
    response.status(400).send({ error: 'bad input' });
  }

  if (error.name === 'ReferenceError') {
    response.status(400).send({ error: 'bad blog id' });
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
