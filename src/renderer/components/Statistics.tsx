import React from 'react'

const Statistics = () => {
  return (
    <div
      className="flex-1 rounded-md overflow-hidden border focus:ring-4"
      tabIndex={0}
    >
      <table className="border-none w-full h-full">
        <thead>
          <tr className="divide-x">
            <th className="px-4 py-2">输入</th>
            <th className="px-4 py-2">次数</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t divide-x">
            <td colSpan={2} className="px-4 py-3 text-center">
              无数据
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
