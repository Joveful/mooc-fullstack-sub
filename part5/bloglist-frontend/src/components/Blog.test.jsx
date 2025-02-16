import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog component', () => {
  const user = {
    username: 'userman',
  }

  const blog = {
    title: 'Test blog title',
    author: 'Test blog author',
    url: 'testurl.com',
    likes: 2,
    user
  }

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('Test blog title Test blog author')
  expect(element).toBeDefined()
})
