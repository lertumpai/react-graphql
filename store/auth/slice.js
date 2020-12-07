import { createSlice } from '@reduxjs/toolkit'

import { STATUS_SUCCESS, STATUS_ERROR, STATUS_IDLE, STATUS_LOADING } from '../status'
import { register, login } from './asyncThunk'

const initialState = {
  status: STATUS_IDLE,
  error: null,
  currentUser: null,
}

const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetStateAuth: state => {
      state.error = null
      state.currentUser = null
      state.status = STATUS_IDLE
    },
    idleStateAuth: state => {
      state.status = STATUS_IDLE
    },
    setCurrentUser: (state, user) => {
      state.currentUser = user
    },
  },
  extraReducers: {
    [register.pending]: state => {
      state.status = STATUS_LOADING
    },
    [register.fulfilled]: (state, action) => {
      state.error = null
      state.currentUser = action.payload
      state.status = STATUS_SUCCESS
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload
      state.currentUser = null
      state.status = STATUS_ERROR
    },
    [login.pending]: state => {
      state.status = STATUS_LOADING
    },
    [login.fulfilled]: (state, action) => {
      state.error = null
      state.currentUser = action.payload
      state.status = STATUS_SUCCESS
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload
      state.currentUser = null
      state.status = STATUS_ERROR
    },
  },
})

export const { resetStateAuth, idleStateAuth, setCurrentUser } = authSlices.actions

export default authSlices.reducer
