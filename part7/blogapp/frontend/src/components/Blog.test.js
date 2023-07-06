import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('blog component tests', () => {
  const blog = {
    title: 'HTML is easy',
    author: 'person',
    likes: 4,
    url: 'link'
  }
  const mockUpdateBlog = jest.fn()
  const mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    render(<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog}/>)
    const elem = screen.getByText('HTML is easy - person')
    expect(elem).toBeDefined()
  })

  test('renders url and likes when clicked', async () => {
    render(<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    let elem = screen.getByText('link')
    expect(elem).toBeDefined()
    elem = screen.getByText('likes 4')
    expect(elem).toBeDefined()
  })

  test('like button pressed twice correctly', async () => {
    render(<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    let elem = screen.findByText('likes 6')
    expect(elem).toBeDefined()
  })
})
