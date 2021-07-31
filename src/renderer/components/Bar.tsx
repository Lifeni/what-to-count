import { ViewContext } from '@renderer/App'
import React, { useContext } from 'react'
import {
  FiArrowLeft,
  FiDownload,
  FiPrinter,
  FiRotateCcw,
  FiRotateCw,
  FiTrash2,
} from 'react-icons/fi'
import Button from './Button'

const Bar = () => {
  const setView = useContext(ViewContext)

  return (
    <div className="flex justify-between gap-4">
      <section className="flex gap-4">
        <Button action={() => setView && setView('start')}>
          <FiArrowLeft /> 返回最近记录
        </Button>
        <Button>
          <FiRotateCcw /> 撤销
        </Button>
        <Button>
          <FiRotateCw /> 重做
        </Button>
      </section>
      <section className="flex gap-4">
        <Button color="red-500">
          <FiTrash2 /> 移除所有记录
        </Button>
        <Button color="green-600">
          <FiPrinter /> 打印
        </Button>
        <Button color="blue-500">
          <FiDownload /> 导出记录
        </Button>
      </section>
    </div>
  )
}

export default Bar
