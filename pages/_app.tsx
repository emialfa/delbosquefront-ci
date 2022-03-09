import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import { initCategories } from '../store/actions/categories'
import { initTypes } from '../store/actions/types'
import { useCallback, useEffect } from 'react'
import { login } from '../store/actions/user'
import { initProducts } from '../store/actions/products'
import { initLocalCart, initUserCart } from '../store/actions/cart'
import { initLocalFavorites, initUserFavorites } from '../store/actions/favorites'
import { userRefreshToken } from '../services/users'
import HeadLayout from '../components/head'

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  const verifyUser = useCallback(() => {
    userRefreshToken()
    .then(async (response) => {
      console.log(response)
      if (response.statusText === "OK") {
        const data = response.data
        store.dispatch(login(data.token, data.isAdmin)) 
        store.dispatch(initUserFavorites(data.token))
        store.dispatch(initUserCart(data.token))  
      } else {
        store.dispatch(login(undefined, false)) 
        if (localStorage.cart){
          store.dispatch(initLocalCart())
        }
        if (localStorage.likes){
          store.dispatch(initLocalFavorites())
        };
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    }).catch(err => {console.log(err);store.dispatch(login(undefined, false))})
  }, [store.dispatch]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  useEffect(() => {
    store.dispatch(initCategories())
    store.dispatch(initTypes())
    store.dispatch(initProducts());
  },[])

    /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback(event => {
    if (event.key === "logout") {
      window.location.reload()
    }
  }, [])
  
  useEffect(() => {
    window.addEventListener("storage", syncLogout)
    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout])

  return  (<Provider store={store}>
    <HeadLayout>
      <Component {...pageProps} />
    </HeadLayout>
</Provider>)
}