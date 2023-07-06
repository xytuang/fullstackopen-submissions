import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import BlogList from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/authReducer'
import LoginForm from './components/LoginForm'

const App = () => {


  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (user === null){
    return (
      <LoginForm/>
    )
  }

  return (
    <div>
      <Notification/>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <br></br>
      <Togglable buttonShow='new blog'  buttonHide='cancel'>
        <BlogForm/>
      </Togglable>
      <br></br>
      <BlogList/>
    </div>
  )
}

export default App