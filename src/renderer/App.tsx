import React, { ReactElement, useEffect, useState } from 'react'
import Count from './views/Count'
import Home from './views/Home'

const App = () => {
  const [view, setView] = useState<ReactElement | null>(null)

  useEffect(() => {
    const hash = window.location.hash
    switch (hash) {
      case '': {
        setView(<Home />)
        break
      }
      default: {
        setView(<Count />)
        break
      }
    }
  }, [])

  return <div className="h-screen w-full font-sans p-6">{view}</div>
}

export default App
