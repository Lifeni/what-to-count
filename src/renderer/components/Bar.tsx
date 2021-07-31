import { ipcRenderer } from 'electron'
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
        <Button onClick={() => window.electron.view('home')}>
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
        <Button className="bg-red-500 text-white">
          <FiTrash2 /> 移除所有记录
        </Button>
        <Button className="bg-green-600 text-white">
          <FiPrinter /> 打印
        </Button>
        <Button className="bg-blue-500 text-white">
          <FiDownload /> 导出记录
        </Button>
      </section>
    </div>
  )
}

export default Bar
