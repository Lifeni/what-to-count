import Bar from '@renderer/components/Bar'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Helmet } from 'react-helmet'
import { LogType } from '../index'
import Input from '../components/Input'
import Logs from '../components/Logs'
import Statistics from '../components/Statistics'

export const InputContext = createContext<{
  logs: LogType[]
  setLogs: Dispatch<SetStateAction<LogType[]>>
} | null>(null)

const Count = () => {
  const [hash, setHash] = useState<string>('')
  const [logs, setLogs] = useState<LogType[]>([])

  useEffect(() => {
    setHash(window.location.hash)
  }, [])

  return (
    <>
      <Helmet>
        <title>计数与统计 {hash}</title>
      </Helmet>
      <InputContext.Provider
        value={{
          logs,
          setLogs,
        }}
      >
        <main className="h-full max-h-full flex flex-col gap-6">
          <Bar />
          <div className="flex-1 grid grid-cols-5 gap-6 min-h-0">
            <section className="flex flex-col col-span-2 gap-6 h-full min-h-0">
              <Input />
              <Statistics />
            </section>
            <section className="col-span-3 h-full min-h-0">
              <Logs />
            </section>
          </div>
        </main>
      </InputContext.Provider>
    </>
  )
}

export default Count
