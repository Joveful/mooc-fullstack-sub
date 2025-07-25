const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  if (todos) {
    redis.setAsync('added_todos', todos.length)
  }
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const todos = await redis.getAsync('added_todos')
  redis.setAsync('added_todos', Number(todos) + 1)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo).status(200);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo._doc
  const body = req.body.done
  const newTodo = {
    done: body,
  }

  const ret = await Todo.findByIdAndUpdate(todo._id, newTodo, { new: true });
  res.send(ret).status(201)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
