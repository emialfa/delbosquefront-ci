import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import combineReducers  from './reducers/index'
let store:any

function initStore(initialState:any) {
  if (process.env.NODE_ENV === 'production'){
    return createStore(
      combineReducers,
      initialState,
      applyMiddleware(thunkMiddleware)
    )
  } else {
    return createStore(
      combineReducers,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
  }
}

export const initializeStore = (preloadedState:any) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState:any) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

const storeType = createStore(
  combineReducers
  )
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof storeType.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof storeType.dispatch
