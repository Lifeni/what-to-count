import { calcStatistics } from '@renderer/utils/calc-statistics'
import { getMapping } from '@renderer/utils/mapping-handler'
import { InputContext } from '@renderer/views/Count'
import React, { useContext, useEffect, useState } from 'react'
import { StatType } from '../index'

const Statistics = () => {
  const context = useContext(InputContext)
  const [stats, setStats] = useState<StatType[]>([])

  useEffect(() => {
    if (context) {
      setStats(calcStatistics(context.logs, 'count'))
    }
  }, [context])

  return (
    <div className="w-full h-full min-h-0 rounded-md overflow-y-auto border">
      {context && context.logs.length !== 0 ? (
        <table className="w-full border-none">
          <thead>
            <tr className="border-b divide-x bg-gray-50">
              <th className="px-4 py-3">输入</th>
              <th className="px-4 py-3">映射</th>
              <th className="px-4 py-3">次数</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(stat => (
              <tr
                className="border-b divide-x even:bg-gray-50"
                key={stat.input}
              >
                <td className="px-4 py-3 text-center font-bold">
                  {stat.input}
                </td>
                <td className="px-4 py-3 text-center">
                  {getMapping(stat.input)}
                </td>
                <td className="px-4 py-3 text-center">{stat.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-gray-400">无统计数据</p>
        </div>
      )}
    </div>
  )
}

export default Statistics
