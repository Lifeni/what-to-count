import React from 'react'

const Statistics = () => {
  return (
    <div className="flex-1">
      <table className="table-auto w-full h-full">
        <thead>
          <tr>
            <th className="px-4 py-3 border">输入</th>
            <th className="px-4 py-3 border">次数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} className="px-4 py-3 border text-center">
              无数据
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
