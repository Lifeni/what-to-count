import { filterRecord } from '@renderer/utils/record-handler'
import React, { useState } from 'react'
import Button from './Button'

const Filter = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [input, setInput] = useState('')

  const handleFilterRecord = () => {
    filterRecord(from, to, input)
  }

  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-4 w-full items-center">
        <input
          type="number"
          placeholder="编号（可选）"
          className="border rounded-md px-4 py-2 w-36 outline-none transition focus:ring-4"
          onChange={e => setInput(e.target.value)}
        />
        <input
          type="date"
          className="border rounded-md px-4 py-2 flex-1 outline-none transition focus:ring-4"
          onChange={e => setFrom(e.target.value)}
        />
        <p> 到 </p>
        <input
          type="date"
          className="border rounded-md px-4 py-2 flex-1 outline-none transition focus:ring-4"
          onChange={e => setTo(e.target.value)}
        />
        <Button
          className="hover:bg-blue-600 hover:text-white"
          onClick={handleFilterRecord}
        >
          导出
        </Button>
      </section>
    </div>
  )
}

export default Filter
