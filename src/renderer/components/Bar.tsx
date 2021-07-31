import React from 'react'
import Button from './Button'

const Bar = () => {
  return (
    <div className="flex justify-between gap-4">
      <section className="flex gap-4">
        <Button>返回最近记录</Button>
        <Button>撤销</Button>
        <Button>重做</Button>
      </section>
      <section className="flex gap-4">
        <Button color="red">移除所有记录</Button>
        <Button color="blue">导出记录</Button>
      </section>
    </div>
  )
}

export default Bar
