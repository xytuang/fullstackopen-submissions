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

import { Routes, Route, Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'




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

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
              <button onClick={handleLogout}>logout</button>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em style={padding}>{user.name} logged in</em>
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification/>
      <h2>blogs</h2>
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