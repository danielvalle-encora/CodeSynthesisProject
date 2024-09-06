import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<{ id:number, name:string, age:number }>({ id: 0, name: '', age: 0 })

  useEffect(() => {
    axios.get('/api/test').then((res) => setData(res.data))
    // axios.post('/api/test', {}).then((res) => setData(res.data))
  }, [])

  return (
    <>
      <div>
        <form>
          <input type="text" name="name" value={data?.name || ''} onChange={(e) => setData({ ...data, name: e.target.value ?? "" })} />
          <input type="number" name="age" value={data?.age || ''} onChange={(e) => setData({ ...data, age: parseInt(e.target.value) || 0 })} />
          <button type="submit">Submit</button>
        </form>
      
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
