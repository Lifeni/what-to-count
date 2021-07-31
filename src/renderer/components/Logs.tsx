import React from 'react'

const Logs = () => {
  return (
    <table className="table-auto w-full h-full border">
      <thead>
        <tr>
          <th className="px-4 py-2 border">序号</th>
          <th className="px-4 py-2 border">时间</th>
          <th className="px-4 py-2 border">输入</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={3} className="px-4 py-3 border text-center">
            无数据
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Logs
