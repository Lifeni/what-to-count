import { InputContext } from '@renderer/views/Count'
import localforage from 'localforage'
import React, {
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

const Input = () => {
  const context = useContext(InputContext)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    if (context?.logs.length === 0) {
      setInput('')
      setResult('')
      inputRef.current && (inputRef.current.value = '')
    }
  }, [context?.logs])

  const handleSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (inputRef.current && context) {
        if (input !== '') {
          setResult('...')

          const arr = [
            {
              time: new Date().getTime().toString(),
              name: input,
            },
            ...context.logs,
          ]

          context.setLogs(arr)
          localforage.setItem(context.hash.replace('#', ''), arr)
          setInput('')
          setResult(input)
        }
        inputRef.current.value = ''
      }
    }
  }

  return (
    <input
      ref={inputRef}
      className="w-full px-5 py-4 text-6xl border outline-none rounded-md text-center focus:ring-4"
      type="text"
      autoFocus
      placeholder={result ? `[ ${result} ]` : '等待输入'}
      onChange={e => setInput(e.target.value.trim())}
      onKeyDown={handleSubmit}
      style={{ caretColor: 'transparent' }}
    />
  )
}

export default Input
