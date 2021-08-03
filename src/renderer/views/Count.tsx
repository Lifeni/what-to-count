import Bar from '@renderer/components/Bar'
import localforage from 'localforage'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Helmet } from 'react-helmet'
import Input from '../components/Input'
import Logs from '../components/Logs'
import Statistics from '../components/Statistics'
import { LogType } from '../index'

export const InputContext = createContext<{
  logs: LogType[]
  setLogs: Dispatch<SetStateAction<LogType[]>>
  hash: string
} | null>(null)

const Count = () => {
  const [hash, setHash] = useState<string>('')
  const [logs, setLogs] = useState<LogType[]>([])

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setHash(hash)
      localforage
        .getItem(hash.replace('#', ''))
        .then(value => {
          if (value) setLogs(value as LogType[])
        })
        .catch(err => console.error(err))
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{`计数 - 计数与统计 - ${hash}`}</title>
      </Helmet>
      <InputContext.Provider
        value={{
          logs,
          setLogs,
          hash,
        }}
      >
        <main className="h-full max-h-full flex flex-col gap-4">
          <Bar />
          <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
            <section className="flex flex-col col-span-1 gap-4 h-full min-h-0">
              <Input />
              <Statistics />
            </section>
            <section className="col-span-2 h-full min-h-0">
              <Logs />
            </section>
          </div>
        </main>
      </InputContext.Provider>
    </>
  )
}

export default Count
