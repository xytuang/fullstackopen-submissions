import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  //const currentUser = props.currentUser
  //style={canBeDeleted}
  //const canBeDeleted = { display:currentUser.username === blog.user.username ? '' : 'none' }

  const [visible, setVisible] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const removeBlog = () => props.deleteBlog(blog)

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
        <p>likes {blogObject.likes} <button id='like-button' onClick={increaseLikes}>like</button></p>
        <button id='delete-button' onClick={removeBlog}>delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  //currentUser: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog