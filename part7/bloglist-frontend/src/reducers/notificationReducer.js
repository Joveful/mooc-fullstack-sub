import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null,
  },
  reducers: {
    setMessage: {
      reducer: (state, action) => {
        return action.payload
      },
      prepare: (message, type) => {
        return { payload: { message, type } }
      },
    },
    clearMessage: (state) => {
      state.message = null
      state.type = null
    },
  },
})

export const setNotification = (msg, type, time) => {
  return async (dispatch) => {
    dispatch(setMessage(msg, type))
    setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
