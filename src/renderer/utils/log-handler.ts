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
  })
}
