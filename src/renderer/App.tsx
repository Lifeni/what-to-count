import React, { ReactElement, useEffect, useState } from 'react'
import Count from './views/Count'
import Home from './views/Home'
import Mapping from './views/Mapping'

const App = () => {
  const [view, setView] = useState<ReactElement | null>(null)

  useEffect(() => {
    const hash = window.location.hash
    switch (hash) {
      case '': {
        window.log.debug(`打开主页`)
        setView(<Home />)
        break
      }
      case '#mapping': {
        window.log.debug(`打开映射页`)
        setView(<Mapping />)
        break
      }
      default: {
        window.log.debug(`打开计数页 [${hash.replace('#', '')}]`)
        setView(<Count />)
        break
      }
    }
  }, [])

  return (
    <div className="h-screen w-full font-sans p-6 overflow-hidden">{view}</div>
  )
}

export default App
