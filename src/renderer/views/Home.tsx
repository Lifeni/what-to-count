import Button from '@renderer/components/Button'
import dayjs from 'dayjs'
import localforage from 'localforage'
import React, { useEffect, useState } from 'react'
import { FiClock, FiPlus } from 'react-icons/fi'

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
        <h1 className="text-xl px-2 flex items-center gap-3">
          <FiClock />
          最近的记录
        </h1>
        <Button className="bg-blue-500 text-white" onClick={handleNewRecord}>
          <FiPlus />
          新建记录
        </Button>
      </section>
      <div className="w-full min-h-0 border h-full rounded-md">
        {records.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-md text-gray-500">没有记录</p>
          </div>
        ) : (
          <ul className="h-full min-h-0 overflow-auto">
            {records
              .sort((a, b) => Number(b) - Number(a))
              .map(record => (
                <li
                  key={record}
                  className="cursor-pointer px-6 py-4 border-b hover:bg-gray-100"
                  onClick={() => window.electron.setView('count', record)}
                >
                  在&nbsp;
                  {dayjs(Number(record)).format('YYYY 年 M 月 D 日 HH:mm:ss')}
                  &nbsp;创建的
                </li>
              ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default Home
