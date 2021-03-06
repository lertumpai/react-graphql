import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { queryArticles, queryArticle, mutateArticle, mutateArticleAction, mutateArticleDelete } from './asyncThunk'
import { STATUS_LOADING, STATUS_SUCCESS, STATUS_IDLE } from '../status'

const articleAdapters = createEntityAdapter({
  sortComparer: (a, b) => {
    const valueA = new Date(a.createdAt).valueOf()
    const valueB = new Date(b.createdAt).valueOf()
    return valueB - valueA
  },
})

const articleSlices = createSlice({
  name: 'articles',
  initialState: articleAdapters.getInitialState({
    status: STATUS_IDLE,
    hasMore: false,
    error: null,
  }),
  reducers: {
    resetStateArticles: state => {
      state.status = STATUS_IDLE
      state.error = null
      state.hasMore = false
      state.ids = []
      state.entities = {}
    },
    idleStateArticles: state => {
      state.status = STATUS_IDLE
    },
    articleUpsertOne: articleAdapters.upsertOne,
    articleUpsertMany: articleAdapters.upsertMany,
    articleRemoveOne: articleAdapters.removeOne,
    articleRemoveMany: articleAdapters.removeMany,
  },
  extraReducers: {
    [queryArticles.pending]: state => {
      state.status = STATUS_LOADING
    },
    [queryArticles.fulfilled]: (state, { payload }) => {
      state.hasMore = payload.articles?.hasMore
      state.error = null
      state.status = STATUS_SUCCESS
    },
    [queryArticle.pending]: state => {
      state.status = STATUS_LOADING
    },
    [queryArticle.fulfilled]: state => {
      state.error = null
      state.status = STATUS_SUCCESS
    },
    [mutateArticle.pending]: state => {
      state.status = STATUS_LOADING
    },
    [mutateArticle.fulfilled]: state => {
      state.error = null
      state.status = STATUS_SUCCESS
    },
    [mutateArticleAction.pending]: state => {
      state.status = STATUS_LOADING
    },
    [mutateArticleAction.fulfilled]: state => {
      state.error = null
      state.status = STATUS_SUCCESS
    },
    [mutateArticleDelete.pending]: state => {
      state.status = STATUS_LOADING
    },
    [mutateArticleDelete.fulfilled]: state => {
      state.error = null
      state.status = STATUS_SUCCESS
    },
  },
})

export const {
  articleUpsertOne,
  articleUpsertMany,
  articleRemoveOne,
  articleRemoveMany,
  resetStateArticles,
  idleStateArticles,
} = articleSlices.actions

export { queryArticles, queryArticle, mutateArticle, mutateArticleAction, mutateArticleDelete }

export const articleSelectors = articleAdapters.getSelectors(state => state.articles)

export default articleSlices.reducer
