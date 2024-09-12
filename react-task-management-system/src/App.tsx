import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { setCurrentUser, clearCurrentUser } from '@/store/currentUser';

import React, { useEffect } from 'react'

import Login from './common/Login'
import Home from "./common/Home"

import { Button } from '@/components/ui/button'

function App() {
  return (
    <>
      <Provider store={store}>
        <Logout />
        <Router />
      </Provider>
    </>
  )
}

function Logout() {
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(clearCurrentUser())
  }

  return <Button onClick={logout}>Logout</Button>
}

function Router() {
  const { email, token } = useAppSelector(state => state.currentUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const token = sessionStorage.getItem("token");

    if (email && token) {
      dispatch(setCurrentUser({ email: email, token: token }))
    }
  }, [])

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");
    }
  }, [token]);

  return <>
    {!token && <Login />}
    {token && <Home />}
  </>

}

function HomePage() {
  const { email } = useAppSelector(state => state.currentUser)
  const dispatch = useAppDispatch();
  const signOut = () => {
      dispatch(clearCurrentUser())
  }

  return <>
    <div className="w-full h-full p-3">
      <div className="container h-full flex flex-col justify-center">
        <div id="nav" className="w-full flex">
          <div>a </div>
          <div id="nav-spacer" className="grow">a </div>
          <div><Button className="rounded-full" onClick={() => signOut()}>
            {email.charAt(0).toUpperCase()}
            </Button> 
          </div>
        </div>
        <div id="content" className="w-full grow bg-yellow-500">
          I am a Content Creator
        </div>
        <div id="footer" className="w-full bg-red-400">
          I am a Foot
        </div>
      </div>
    </div>
  </>
}

export default App
