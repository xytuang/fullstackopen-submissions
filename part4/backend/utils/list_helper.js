/* eslint-disable no-unused-vars */

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0 ? 0 : blogs.map(elem => elem.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let max = 0
  let bestBlog = {}
  for (let i = 0; i < blogs.length; ++i){
    if (blogs[i].likes >= max){
      max = blogs[i].likes
      bestBlog = blogs[i]
    }
  }
  return bestBlog
}

module.exports = { dummy, totalLikes, favoriteBlog }