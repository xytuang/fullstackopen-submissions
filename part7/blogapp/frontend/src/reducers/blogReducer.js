import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type){
  case 'INIT_BLOG': {
    return action.data
  }
  case 'NEW_BLOG':{
    return state.concat(action.data)
  }
  case 'DELETE_BLOG':{
    return state.filter((blog) => blog.id !== String(action.data))
  }
  case 'LIKE': {
    const id = action.data.id
    const updatedBlog = state.find((blog) => blog.id === id)
    const changedBlog = {
      ...updatedBlog,
      likes: updatedBlog.likes + 1
    }
    return state.map((blog) => (blog.id !== id ? blog : changedBlog))
  }
  case 'COMMENT': {
    const id = action.data.id
    return state.map((blog) => (blog.id !== id ? blog : action.data))
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_BLOG', data: blogs })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(newBlog)
    dispatch({ type: 'NEW_BLOG', data: returnedBlog })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({ type:'DELETE_BLOG', data: id })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({ type: 'LIKE', data: updatedBlog })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, comments: blog.comments.concat(comment) })
    dispatch({ type: 'COMMENT', data: updatedBlog })
  }
}

export default blogReducer