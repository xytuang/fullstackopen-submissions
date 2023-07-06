import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm updates parent state and calls onSubmit>', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogForm handleCreate={createBlog}/>)

  const inputTitle = screen.getByPlaceholderText('enter a title')
  const inputAuthor = screen.getByPlaceholderText('enter an author')
  const inputUrl = screen.getByPlaceholderText('enter a url')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'HTML is easy')
  await user.type(inputAuthor, 'person')
  await user.type(inputUrl, 'url')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('HTML is easy')
  expect(createBlog.mock.calls[0][0].author).toBe('person')
  expect(createBlog.mock.calls[0][0].url).toBe('url')
})