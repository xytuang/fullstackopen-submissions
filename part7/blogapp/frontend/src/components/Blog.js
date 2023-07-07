import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Link, useParams } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
    </div>
  )
}


export const BlogShow = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(u => u.id === id)

  const dispatch = useDispatch()

  const removeBlog = () => {
    dispatch(deleteBlog(blog.id))
  }

  const like = () => {
    dispatch(likeBlog(blog))
  }
  return (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <div>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button id='like-button' onClick={like}>like</button></p>
        <p>comments</p>
        {blog.comments.map(c => <li key={1}>{ c }</li>)}
        <button id='delete-button' onClick={removeBlog}>delete</button>
      </div>
    </div>
  )
}

const BlogList = ({ blogs }) => {
  const byLikes = (b1,b2) => b2.likes - b1.likes

  return (
    <div>
      {blogs.sort(byLikes).map(blog => <Blog key={ blog.id } blog={ blog }/>)}
    </div>
  )
}

export default BlogList