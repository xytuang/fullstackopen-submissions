import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

export const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog.id))
  }

  const like = () => {
    dispatch(likeBlog(blog))
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button id='like-button' onClick={like}>like</button></p>
        <button id='delete-button' onClick={removeBlog}>delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

const BlogList = ({ blogs }) => {
  const byLikes = (b1,b2) => b2.likes - b1.likes

  return (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default BlogList