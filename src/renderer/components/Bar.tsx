import { JSONToCSV } from '@renderer/utils/json-to-csv'
import dayjs from 'dayjs'
import { ipcRenderer } from 'electron'
import localforage from 'localforage'
import React from 'react'
import {
  FiClock,
  FiDownload,
  FiPrinter,
  FiRotateCcw,
  FiRotateCw,
  FiTrash2,
} from 'react-icons/fi'
import { LogType } from '..'
import Button from './Button'

const Bar = () => {
  const handleExportRecord = async () => {
    const id = window.location.hash.replace('#', '')
    const data = await localforage.getItem<LogType[]>(id)
    if (data) {
      window.electron.exportRecord(
        JSONToCSV(data),
        `在 ${dayjs(Number(id)).format('YYYY-MM-DD HH-mm-ss')} 创建的记录`
      )
    }
  }

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
        <Button className="bg-red-500 text-white">
          <FiTrash2 /> 清空记录
        </Button>
        <Button className="bg-green-600 text-white">
          <FiPrinter /> 打印
        </Button>
        <Button
          className="bg-blue-500 text-white"
          onClick={() => handleExportRecord()}
        >
          <FiDownload /> 导出记录
        </Button>
      </section>
    </div>
  )
}

export default Bar
