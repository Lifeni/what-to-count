import { clearLogs, revertLog } from '@renderer/utils/log-handler'
import { exportRecord } from '@renderer/utils/record-handler'
import { InputContext } from '@renderer/views/Count'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import {
  FiClock,
  FiDownload,
  FiFile,
  FiPrinter,
  FiRotateCcw,
  FiTrash2,
} from 'react-icons/fi'
import Button from './Button'

const Bar = () => {
  const context = useContext(InputContext)
  const hash = window.location.hash.replace('#', '')

  return (
    <div className="flex justify-between gap-4">
      <Button onClick={() => window.electron.setView('home')}>
        <FiClock /> 打开最近记录
      </Button>
      <h1 className="px-4 text-gray-400 flex gap-3 items-center justify-center flex-1 border rounded-md hover:text-gray-600 transition cursor-default">
        <FiFile />
        在&nbsp;
        {dayjs(Number(hash.replace('#', ''))).format(
          'YYYY 年 MM 月 DD 日 HH:mm:ss'
        )}
        &nbsp;创建的
      </h1>

      <Button
        className="hover:bg-green-600 hover:text-white"
        onClick={() =>
          context && revertLog(hash, context.logs, context.setLogs)
        }
        disabled={context?.logs.length === 0}
      >
        <FiRotateCcw /> 撤销上次输入
      </Button>
      <Button
        className="hover:bg-red-600 hover:text-white"
        onClick={() => context && clearLogs(hash, context.setLogs)}
      >
        <FiTrash2 /> 清空
      </Button>
      <Button
        className="hover:bg-blue-600 hover:text-white"
        onClick={() => exportRecord(hash)}
      >
        <FiDownload /> 导出
      </Button>
    </div>
  )
}

export default Bar
