import { ViewContext } from '@renderer/App'
import Button from '@renderer/components/Button'
import localforage from 'localforage'
import React, { useContext, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

const Start = () => {
  const setView = useContext(ViewContext)
  const [records, setRecords] = useState<string[]>([])

  useEffect(() => {
    localforage.keys().then(keys => setRecords(keys))
  }, [])

  const handleNewRecord = () => {
    if (setView) {
      setView('count')
    }
  }

  return (
    <main className="w-100 max-w-xl h-full mx-auto flex flex-col items-center justify-center gap-6">
      <section className="w-full col-span-1 flex gap-6 justify-between">
        <h1 className="text-2xl px-2">最近的记录</h1>
        <Button color="blue-500" action={handleNewRecord}>
          <FiPlus />
          新建记录
        </Button>
      </section>
      <div className="w-full border h-80 p-6 rounded-md">
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

export default Start
