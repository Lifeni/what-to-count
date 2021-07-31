import Bar from '@renderer/components/Bar'
import React, { createContext, Dispatch, SetStateAction } from 'react'
import Input from '../components/Input'
import Logs from '../components/Logs'
import Statistics from '../components/Statistics'

const InputContext = createContext([])

const Count = () => {
  return (
    <InputContext.Provider value={[]}>
      <main className="h-full flex flex-col gap-6">
        <Bar />
        <div className="h-full grid grid-cols-5 gap-6">
          <section className="flex flex-col col-span-2 gap-6 h-full">
            <Input />
            <Statistics />
          </section>
          <section className="col-span-3 h-full">
            <Logs />
          </section>
        </div>
      </main>
    </InputContext.Provider>
  )
}

export default Count
