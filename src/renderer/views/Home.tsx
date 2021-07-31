import Button from '@renderer/components/Button'
import localforage from 'localforage'
import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

const Home = () => {
  const [records, setRecords] = useState<string[]>([])

  useEffect(() => {
    localforage.keys().then(keys => setRecords(keys))
  }, [])

  const handleNewRecord = () => {
    const unixTime = new Date().getTime()
    window.electron.setView('count', unixTime.toString())
  }

  return (
    <main className="w-100 h-full mx-auto flex flex-col items-center justify-center gap-6">
      <section className="w-full col-span-1 flex gap-6 justify-between items-center">
        <Button className="bg-blue-500 text-white" onClick={handleNewRecord}>
          <FiPlus />
          新建记录
        </Button>
      </section>
      <div className="w-full border h-full p-6 rounded-md">
        {records.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-md text-gray-500">没有记录</p>
          </div>
        ) : (
          <ul>
            {records.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default Home
