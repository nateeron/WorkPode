import { useState } from 'react'
import Top from '../Tool/Top'
import { Routes, Route, Link } from 'react-router-dom';
import AddData from '../Page/AddData';
import Dashboard from '../Page/Dashboard';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Top />
      <div className='container'>
      <Routes>
        <Route path="/" element={<AddData />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </div>
    </>
  )
}

export default App