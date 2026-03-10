import { useState } from 'react'
import GlobeBackground from "./components/GlobeBackground";
function App() {
  const [hint, setHint] = useState(null)
  const [error, setError] = useState(null)

  const fetchHint = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/status')
      const data = await response.json()
      setHint(data.hint)
    } catch (e) {
      setError('Could not reach server')
    }
  }

  return (
    <GlobeBackground />
  )
}

export default App