import React from 'react'

const Logs = () => {
  return (
    <div
      className="w-full h-full rounded-md overflow-hidden border focus:ring-4"
      tabIndex={0}
    >
      <table className="w-full h-full border-none">
        <thead>
          <tr className="divide-x">
            <th className="px-4 py-2">序号</th>
            <th className="px-4 py-2">时间</th>
            <th className="px-4 py-2">输入</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t divide-x">
            <td colSpan={3} className="px-4 py-3 text-center ">
              无数据
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Logs
