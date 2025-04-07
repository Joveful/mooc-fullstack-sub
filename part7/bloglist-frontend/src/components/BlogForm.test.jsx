import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('test BlogForm', async () => {
  const createBlog = vi.fn()
  const ue = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const inputTitle = container.querySelector('#blog-title')
  const inputAuthor = container.querySelector('#blog-author')
  const inputUrl = container.querySelector('#blog-url')
  const sendButton = screen.getByRole('button', { name: 'save' })

  await ue.type(inputTitle, 'test title')
  await ue.type(inputAuthor, 'author')
  await ue.type(inputUrl, 'url')
  await ue.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
})
