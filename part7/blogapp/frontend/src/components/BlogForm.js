import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ handleCreate }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({
      title: title,
      author: author,
      url: url
    })
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

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default BlogForm