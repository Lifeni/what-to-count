import React, { createContext } from 'react'
import Input from '../components/Input'
import Logs from '../components/Logs'
import Statistics from '../components/Statistics'

const InputContext = createContext([])

const App = () => {
  return (
    <InputContext.Provider value={[]}>
      <div className="h-screen w-full font-sans p-6">
        <main className="h-full grid grid-cols-5 gap-6">
          <section className="flex flex-col col-span-2 gap-6 h-full">
            <Input />
            <Statistics />
          </section>
          <section className="col-span-3 h-full">
            <Logs />
          </section>
        </main>
      </div>
    </InputContext.Provider>
  )
}

export default App
