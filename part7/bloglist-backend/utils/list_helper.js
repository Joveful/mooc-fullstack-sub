const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (fav, item) => {
    return fav.likes > item.likes ? fav : item
  }

  return blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  const count = []

  // count the number of blogs per author
  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author

    const found = count.find(blog => {
      return blog.author === author
    })

    if (found === undefined) {
      count.push({ author: author, blogs: 1 })
    } else {
      for (let j = 0; j < count.length; j++) {
        if (count[j].author === author) {
          count[j].blogs += 1
          break
        }
      }
    }
  }

  const reducer = (most, item) => {
    return most.blogs > item.blogs ? most : item
  }

  return count.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
  const count = []

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author

    const found = count.find((blog) => {
      return blog.author === author
    })

    if (!found) {
      count.push({ author: author, likes: blogs[i].likes })
    } else {
      for (let j = 0; j < count.length; j++) {
        if (count[j].author === author) {
          count[j].likes += blogs[i].likes
        }
      }
    }
  }

  const reducer = (most, item) => {
    return most.likes > item.likes ? most : item
  }

  return count.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
