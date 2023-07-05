const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'this is a test',
    author: 'somebody',
    url: 'link',
    likes: 3
  },
  {
    title: 'this is a second test',
    author: 'another',
    url: 'link 2',
    likes: 5
  },
  {
    title: 'this is a third test',
    author: 'someone new',
    url: 'link 3',
    likes: 7
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }