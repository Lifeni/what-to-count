import React, { KeyboardEvent, useRef, useState } from 'react'

const Input = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (inputRef.current) {
        if (input !== '') {
          setResult('...')
          console.log(input)
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
