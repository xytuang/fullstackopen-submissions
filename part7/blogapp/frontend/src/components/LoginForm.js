import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import Notification from './Notification'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const handleLogin = async event => {
    event.preventDefault()
    dispatch(login(username, password))
    dispatch(initializeBlogs())
    setUsername('')
    setPassword('')
  }
  return (<div>
    <Notification/>
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
  </div>)
}

export default LoginForm