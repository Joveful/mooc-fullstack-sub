import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('click view button', async () => {
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

  const { container } = render(
    <Blog blog={blog} user={user} />
  )

  const ue = userEvent.setup()
  const button = screen.getByText('view')
  await ue.click(button)

  const div = container.querySelector('.blogstyle')
  expect(div).toHaveTextContent('testurl.com')
})
