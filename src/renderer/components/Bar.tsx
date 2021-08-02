import { exportRecord } from '@renderer/utils/record-handler'
import React from 'react'
import {
  FiClock,
  FiDownload,
  FiPrinter,
  FiRotateCcw,
  FiRotateCw,
  FiTrash2,
} from 'react-icons/fi'
import Button from './Button'

const Bar = () => {
  return (
    <div className="flex justify-between gap-4">
      <section className="flex gap-4">
        <Button onClick={() => window.electron.setView('home')}>
          <FiClock /> 打开最近记录
        </Button>
        <Button>
          <FiRotateCcw /> 撤销
        </Button>
        <Button>
          <FiRotateCw /> 重做
        </Button>
      </section>
      <section className="flex gap-4">
        <Button>
          <FiTrash2 /> 清空
        </Button>
        <Button>
          <FiPrinter /> 打印
        </Button>
        <Button
          onClick={() => exportRecord(window.location.hash.replace('#', ''))}
        >
          <FiDownload /> 导出
        </Button>
      </section>
    </div>
  )
}

export default Bar
