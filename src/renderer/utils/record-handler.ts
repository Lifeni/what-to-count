import dayjs from 'dayjs'
import localforage from 'localforage'
import { Dispatch, SetStateAction } from 'react'
import { LogType } from '..'
import { JSONToCSV } from './export-csv'

export const createRecord = async () => {
  const unixTime = new Date().getTime()
  window.electron.setView('count', unixTime.toString())
}

export const getRecords = async (
  setRecords: Dispatch<SetStateAction<string[]>>
) => {
  const keys = await localforage.keys()
  setRecords(keys)
}

export const exportRecord = async (id: string) => {
  const data = await localforage.getItem<LogType[]>(id)
  if (data) {
    window.electron.exportRecord(
      JSONToCSV(data),
      `在 ${dayjs(Number(id)).format('YYYY-MM-DD HH-mm-ss')} 创建的记录`
    )
  }
}

export const removeRecord = async (
  id: string,
  setRecords: Dispatch<SetStateAction<string[]>>
) => {
  window.electron.showConfirm('确认删除这条记录吗？', async () => {
    await localforage.removeItem(id)
    await getRecords(setRecords)
  })
}
