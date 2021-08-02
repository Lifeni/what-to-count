import Button from '@renderer/components/Button'
import {
  createRecord,
  exportRecord,
  getRecords,
  removeRecord,
} from '@renderer/utils/record-handler'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import {
  FiClock,
  FiDownload,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
} from 'react-icons/fi'

const Home = () => {
  const [records, setRecords] = useState<string[]>([])

  useEffect(() => {
    getRecords(setRecords)
  }, [])

  return (
    <main className="w-100 h-full mx-auto flex flex-col items-center justify-center gap-6">
      <section className="w-full col-span-1 flex gap-4 justify-between items-center">
        <section className="flex gap-4 items-center">
          <h1 className="text-xl px-2 flex items-center gap-3">
            <FiClock />
            最近的记录
          </h1>
        </section>
        <section className="flex gap-4 items-center">
          <Button onClick={() => getRecords(setRecords)}>
            <FiRefreshCw /> 刷新
          </Button>
          <Button
            className="bg-blue-500 text-white"
            onClick={() => createRecord()}
          >
            <FiPlus />
            新建记录
          </Button>
        </section>
      </section>
      <div className="w-full min-h-0 border h-full rounded-md">
        {records.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-md text-gray-500">没有记录</p>
          </div>
        ) : (
          <div className="h-full min-h-0 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b divide-x">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">名称</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {records
                  .sort((a, b) => Number(b) - Number(a))
                  .map((record, index) => (
                    <tr key={record} className="px-6 py-4 border-b divide-x">
                      <td className="px-4 py-3 text-center">
                        {records.length - index}
                      </td>
                      <td
                        className="cursor-pointer px-4 py-3 text-center hover:bg-gray-100"
                        onClick={() => window.electron.setView('count', record)}
                      >
                        在&nbsp;
                        {dayjs(Number(record)).format(
                          'YYYY 年 MM 月 DD 日 HH:mm:ss'
                        )}
                        &nbsp;创建的
                      </td>
                      <td className="grid grid-cols-2 divide-x">
                        <button
                          onClick={() => exportRecord(record)}
                          className="flex gap-3 items-center justify-center px-4 py-3 cursor-pointer text-blue-600 hover:bg-gray-100"
                        >
                          <FiDownload /> 导出
                        </button>
                        <button
                          onClick={() => removeRecord(record, setRecords)}
                          className="flex gap-3 items-center justify-center px-4 py-3 cursor-pointer text-red-600 hover:bg-gray-100"
                        >
                          <FiTrash2 /> 删除
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
