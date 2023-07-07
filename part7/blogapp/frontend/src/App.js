import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import { User } from './components/UserList'


import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/authReducer'
import { initializeAllUsers } from './reducers/userReducer'

import { Routes, Route } from 'react-router-dom'




const App = () => {


  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

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
        <Route path='/users/:id' element={ <User users={ users } />}/>
        <Route path='/users' element={<UserList users={ users }/>}/>
      </Routes>
    </div>
  )
}

export default App

// (<></>)


// (<div>
//   <Notification/>
//   <LoginForm/>
// </div>)
// : (
//   <>
//     <br></br>
//     <h3>{user.name}</h3>
//     <h4>Added blogs</h4>
//     {!foundUser ? null : (
//       <Table striped>
//         <tbody>
//           {foundUser.blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
//         </tbody>
//       </Table>
//     )}
//   </>
// )

{/* <Route path='/' element={ <BlogList blogs={blogs}/>}/> */}