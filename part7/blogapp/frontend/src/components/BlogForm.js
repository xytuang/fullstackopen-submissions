import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'


const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title,
      author: author,
      url: url
    }))
    dispatch(notificationChange(`a new blog ${title} by ${author} has been added`, 5))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title: <input type='text' id='title' value={title} onChange={({ target }) => setTitle(target.value)} placeholder='enter a title'/>
        </div>
        <div>
            author: <input type='text' id='author' value={author} onChange={({ target }) => setAuthor(target.value)} placeholder='enter an author'/>
        </div>
        <div>
            url: <input type='text' id='url' value={url} onChange={({ target }) => setUrl(target.value)} placeholder='enter a url'/>
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}
export default BlogForm