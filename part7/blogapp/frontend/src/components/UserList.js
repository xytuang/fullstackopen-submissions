
import { Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import BlogList from './Blog'

export const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  const blogs = user.blogs
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <BlogList blogs={blogs}/>
    </div>
  )
}


const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.username}</Link></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList