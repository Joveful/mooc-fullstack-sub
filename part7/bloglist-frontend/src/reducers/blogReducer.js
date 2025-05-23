import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    setBlogs: (state, action) => {
      return action.payload
    },
    incrementVote: (state, action) => {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state
        .map((blog) => (blog.id !== id ? blog : changedBlog))
        .sort((a, b) => b.likes - a.likes)
    },
    appendComment: (state, action) => {
      const id = action.payload.id
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        comments: [...blogToChange.comments, action.payload.comment]
      }
      return state
        .map((blog) => (blog.id !== id ? blog : changedBlog))
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const addBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    dispatch(initializeBlogs())
  }
}

export const voteBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog)
    dispatch(incrementVote(updatedBlog.id))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(initializeBlogs())
  }
}

export const addComment = (content, id) => {
  return async (dispatch) => {
    const comment = {
      comment: content,
      id: id
    }
    await blogService.comment(content, id)
    dispatch(appendComment(comment))
  }
}

export const { appendBlog, setBlogs, incrementVote, appendComment } = blogSlice.actions
export default blogSlice.reducer
