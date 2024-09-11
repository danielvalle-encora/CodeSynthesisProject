import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import useToken from './props/UseToken'

import Login from './common/Login'
import Layout from "./common/Layout"

function App() {
  const { token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="*" element={<Layout />} />
            {/* <Route path="/register" element={<Registration />} /> */}
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
