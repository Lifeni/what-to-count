import { InputContext } from '@renderer/views/Count'
import React, { KeyboardEvent, useContext, useRef, useState } from 'react'
import { LogType } from '../index'

const Input = () => {
  const context = useContext(InputContext)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (inputRef.current && context) {
        if (input !== '') {
          setResult('...')

          context.setLogs([
            {
              time: new Date().getTime().toString(),
              name: input,
            },
            ...context.logs,
          ])

          setResult(input)
        }
        inputRef.current.value = ''
      }
    }
  }

  return (
    <input
      ref={inputRef}
      className="w-full px-5 py-4 text-5xl border outline-none rounded-md text-center caret-transparent focus:ring-4"
      type="text"
      autoFocus
      placeholder={result ? `[ ${result} ]` : '等待输入'}
      onChange={e => setInput(e.target.value.trim())}
      onKeyDown={handleSubmit}
    />
  )
}

export default Input
