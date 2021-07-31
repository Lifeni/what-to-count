import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import Count from './views/Count'
import Start from './views/Start'

export const ViewContext = createContext<Dispatch<
  SetStateAction<ViewType>
> | null>(null)

const App = () => {
  const [view, setView] = useState<ViewType>('start')

  return (
    <ViewContext.Provider value={setView}>
      <div className="h-screen w-full font-sans p-6">
        {view === 'start' ? <Start /> : view === 'count' ? <Count /> : null}
      </div>
    </ViewContext.Provider>
  )
}

export default App
