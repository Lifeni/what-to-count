import localforage from 'localforage'
import { Dispatch, SetStateAction } from 'react'
import { LogType } from '../index'

export const clearLogs = (
  id: string,
  setLogs: Dispatch<SetStateAction<LogType[]>>
) => {
  window.electron.showConfirm('确认清空这条记录吗？', async () => {
    await localforage.setItem(id, [])
    setLogs([])
    window.log.warn(`记录 [${id}] 清空所有记录`)
  })
}

export const revertLog = async (
  id: string,
  logs: LogType[],
  setLogs: Dispatch<SetStateAction<LogType[]>>
) => {
  window.electron.showConfirm('确认撤销上一次输入记录吗？', async () => {
    const log = logs[0]
    const arr = logs.slice(1)
    await localforage.setItem(id, arr)
    setLogs(arr)
    window.log.warn(`记录 [${id}] 撤销一次记录 [${log.name}]`)
  })
}
