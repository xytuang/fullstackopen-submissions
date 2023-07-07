import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import { User } from './components/UserList'
import { BlogShow } from './components/Blog'
import BlogList from './components/Blog'


import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/authReducer'
import { initializeAllUsers } from './reducers/userReducer'

import { Routes, Route } from 'react-router-dom'





const App = () => {


  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
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
      <Togglable buttonShow='new blog'  buttonHide='cancel'>
        <BlogForm/>
      </Togglable>
      <Routes>
        <Route path='/' element={<BlogList blogs={ blogs }/>}/>
        <Route path='/blogs' element={<BlogList blogs = {blogs}/>}/>
        <Route path='/blogs/:id' element={<BlogShow blogs = {blogs}/>}/>
        <Route path='/users/:id' element={ <User users={ users } />}/>
        <Route path='/users' element={<UserList users={ users }/>}/>
      </Routes>
    </div>
  )
}

export default App