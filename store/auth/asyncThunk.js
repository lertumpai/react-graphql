import { createAsyncThunk } from '@reduxjs/toolkit'

import { mutation, query } from '../../utils/graphql-api/client'
import { REGISTER, LOGIN, SAVE_PROFILE } from './gql'

export const register = createAsyncThunk(
  'auth/mutation/register',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await mutation(REGISTER, { username, password })
      return response.user
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const login = createAsyncThunk(
  'auth/query/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await query(LOGIN, { username, password })
      return response.login
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const mutationProfile = createAsyncThunk(
  'auth/mutation/profile',
  async ({ id, name, birthday, status, image }) => {
    const input = { name, birthday, status, image }
    return mutation(SAVE_PROFILE, { id, input })
  },
)
