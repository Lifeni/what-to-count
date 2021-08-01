import { InputContext } from '@renderer/views/Count'
import React, { useContext } from 'react'
import dayjs from 'dayjs'

const Logs = () => {
  const context = useContext(InputContext)

  return (
    <div
      className="w-full h-full min-h-0 rounded-md overflow-y-auto border focus:ring-4"
      tabIndex={0}
    >
      {context && context.logs.length !== 0 ? (
        <table className="w-full border-none">
          <thead>
            <tr className="border-b divide-x">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">输入</th>
              <th className="px-4 py-3">录入时间</th>
            </tr>
          </thead>
          <tbody>
            {context.logs.map((log, index, logs) => (
              <tr className="border-b divide-x" key={log.time}>
                <td className="px-4 py-3 text-center">{logs.length - index}</td>
                <td className="px-4 py-3 text-center font-bold">{log.name}</td>
                <td className="px-4 py-3 text-center">
                  {dayjs(Number(log.time)).format('YYYY 年 MM 月 DD 日 HH:mm:ss')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-gray-500">无输入记录</p>
        </div>
      )}
    </div>
  )
}

export default Logs
