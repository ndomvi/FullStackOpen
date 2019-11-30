// const _ = require('lodash')

const dummy = () => 1

const totalLikes = list => (list.length === 0 ? {} : list.reduce((sum, current) => sum + current.likes, 0))

const favoriteBlog = list =>
  list.length === 0 ? {} : list.reduce((max, current) => (current.likes > max.likes ? current : max))

/*
const mostBlogs = list => {
  //TODO: so the countBy() returns an object with
  const blogNumbers = _.countBy(list, 'author')
  console.log(blogNumbers)
  return _.maxBy(blogNumbers, elem => elem)
  //   return postNumbers.reduce((max, current) => (current.likes > max.likes ? current : max))
}
*/

module.exports = { dummy, totalLikes, favoriteBlog }
