import Button from '@renderer/components/Button'
import {
  addMapping,
  allMapping,
  removeMapping,
} from '@renderer/utils/mapping-handler'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FiArrowLeft, FiPlus, FiRefreshCw, FiTrash2 } from 'react-icons/fi'
import { MappingType } from '../index'

const Mapping = () => {
  const [mapping, setMapping] = useState<MappingType[]>([])
  const [input, setInput] = useState('')
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const init = async () => {
    setMapping(await allMapping())
  }

  useEffect(() => {
    init()
  }, [])

  const handleAddMapping = async (e: FormEvent) => {
    e.preventDefault()
    if (input && name) {
      await addMapping({ input, name })
      inputRef.current && (inputRef.current.value = '')
      nameRef.current && (nameRef.current.value = '')
      setInput('')
      setName('')
      setMapping(await allMapping())
      inputRef.current?.focus()
    }
  }

  const handleRemoveMapping = async (input: string) => {
    await removeMapping(input, setMapping)
  }

  return (
    <>
      <Helmet>
        <title>{`映射 - 计数与统计`}</title>
      </Helmet>
      <main className="h-full flex flex-col items-center justify-center gap-4">
        <form className="w-full flex gap-4" onSubmit={handleAddMapping}>
          <Button onClick={() => window.electron.setView('home')} type="button">
            <FiArrowLeft />
          </Button>
          <input
            ref={inputRef}
            type="number"
            placeholder="输入（编号）"
            className="w-full border rounded-md px-4 py-2 outline-none transition focus:ring-4"
            onChange={e => setInput(e.target.value)}
          />
          <input
            ref={nameRef}
            type="text"
            placeholder="映射（姓名）"
            className="w-full border rounded-md px-4 py-2 outline-none transition focus:ring-4"
            onChange={e => setName(e.target.value)}
          />
          <Button
            className="min-w-max hover:text-white hover:bg-blue-600"
            type="submit"
            disabled={input === '' || name === ''}
          >
            <FiPlus />
            添加
          </Button>
          <Button className="min-w-max" type="button" onClick={() => init()}>
            <FiRefreshCw /> 刷新
          </Button>
        </form>
        <div className="w-full min-h-0 border h-full rounded-md">
          {mapping.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-md text-gray-400">没有映射</p>
            </div>
          ) : (
            <div className="h-full min-h-0 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b divide-x bg-gray-50">
                    <th className="px-4 py-3">输入</th>
                    <th className="px-4 py-3">目标映射</th>
                    <th className="px-4 py-3 w-32">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {mapping
                    .sort((a, b) => Number(a.input) - Number(b.input))
                    .map(record => (
                      <tr
                        key={record.input}
                        className="px-6 py-4 border-b divide-x even:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-center">
                          {record.input}
                        </td>
                        <td className="px-4 py-3 text-center">{record.name}</td>
                        <td className="grid grid-cols-1 divide-x w-32">
                          <button
                            onClick={() => handleRemoveMapping(record.input)}
                            className="flex gap-3 items-center justify-center px-4 py-3 cursor-pointer text-red-600 hover:bg-gray-100"
                          >
                            <FiTrash2 /> 删除
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Mapping
