import dayjs from 'dayjs'
import localforage from 'localforage'
import { LogType } from '..'
import { JSONToCSV } from './export-csv'

export const createRecord = async () => {
  const unixTime = new Date().getTime()
  window.electron.setView('count', unixTime.toString())
}

export const getRecords = async (
  setRecords: React.Dispatch<React.SetStateAction<string[]>>
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
  setRecords: React.Dispatch<React.SetStateAction<string[]>>
) => {
  window.electron.showConfirm('确认删除这条记录吗？', async () => {
    await localforage.removeItem(id)
    await getRecords(setRecords)
  })
}
