import React, { createContext, useState } from 'react'
import Count from './views/Count'
import Start from './views/Start'

const App = () => {
  const [view, setView] = useState<ViewType>('start')

  return (
    <div className="h-screen w-full font-sans p-6">
      {view === 'start' ? (
        <Start setView={setView} />
      ) : view === 'count' ? (
        <Count setView={setView} />
      ) : null}
    </div>
  )
}

export default App
