import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage: (state, action) => {
      return action.payload
    },
    clearMessage: () => {
      return ''
    }
  }
})

export const setNotification = (msg, time) => {
  return async dispatch => {
    dispatch(setMessage(msg))
    setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
