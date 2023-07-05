import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedbloguser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedbloguser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setNotification('wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setNotification('')
      },5000)
    }
  }

  const handleCreate = blogObject => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
      })
    setNotification(`a new blog ${blogObject.title} by ${blogObject.author} has been added`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const updateBlog = (BlogToUpdate) => {
    blogService
      .update(BlogToUpdate)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        setNotification(`Cannot update ${BlogToUpdate.title}`)
        setTimeout(() => {
          setNotification('')
        }, 5000)
      })
  }

  const deleteBlog = async BlogToDelete => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title}`)){
        blogService
          .remove(BlogToDelete.id)
        setNotification(`${BlogToDelete.title} was successfully removed`)
        setBlogs(blogs.filter(b => b.id !== BlogToDelete.id))
        setTimeout(() => {
          setNotification('')
        }, 5000)
      }
    } catch (exception){
      setNotification(`${BlogToDelete.title} could not be removed`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <p>{notification}</p>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input type='text' value={username} id='username' name='Username' onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
        password
          <input type='text' value={password} id='password' name='Password' onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => (
    <div>
      <p>{notification}</p>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <br></br>
      <Togglable buttonShow='new blog'  buttonHide='cancel' ref={blogFormRef}>
        <BlogForm
          handleCreate={handleCreate}
        />
      </Togglable>
      <br></br>
      {blogs.sort(byLikes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} currentUser={user}/>
      )}
    </div>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const byLikes = (b1,b2) => b2.likes - b1.likes

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App