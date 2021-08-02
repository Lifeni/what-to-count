import { InputContext } from '@renderer/views/Count'
import React, { useContext, useEffect, useState } from 'react'
import { StatType } from '../index'

const Statistics = () => {
  const context = useContext(InputContext)
  const [stats, setStats] = useState<StatType[]>([])

  useEffect(() => {
    const map = new Map<string, number>()
    if (context && context.logs) {
      context.logs.map(log => {
        const count = map.get(log.name)
        if (count !== undefined) {
          map.set(log.name, count + 1)
        } else {
          map.set(log.name, 1)
        }
      })
    }

    setStats(
      Array.from(map.entries(), ([key, value]) => ({
        name: key,
        count: value,
      })).sort((a, b) => b.count - a.count)
    )
  }, [context])

  return (
    <div className="w-full h-full min-h-0 rounded-md overflow-y-auto border">
      {context && context.logs.length !== 0 ? (
        <table className="w-full border-none">
          <thead>
            <tr className="border-b divide-x bg-gray-50">
              <th className="px-4 py-3">输入</th>
              <th className="px-4 py-3">次数</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(stat => (
              <tr className="border-b divide-x even:bg-gray-50" key={stat.name}>
                <td className="px-4 py-3 text-center font-bold">{stat.name}</td>
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
