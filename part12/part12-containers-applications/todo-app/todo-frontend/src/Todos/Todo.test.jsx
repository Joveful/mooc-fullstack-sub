import { render, screen } from '@testing-library/react'
import TodoList from './List'

test('render a todo', () => {
  const todo = [{
    text: 'Todo for testing',
    done: 'true'
  }]

  render(<TodoList todos={todo} />)

  const element = screen.getByText('Todo for testing')
  expect(element).toBeDefined()
})
