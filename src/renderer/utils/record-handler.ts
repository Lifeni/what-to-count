import dayjs from 'dayjs'
import localforage from 'localforage'
import { Dispatch, SetStateAction } from 'react'
import { LogType } from '..'
import { calcStatistics } from './calc-statistics'
import { logsToCSV, statsToCSV } from './export-csv'

export const createRecord = async () => {
  const unixTime = new Date().getTime().toString()
  await localforage.setItem(unixTime, [])
  window.electron.setView('count', unixTime)
  window.log.info(`记录 [${unixTime}] 创建记录文件`)
}

export const getRecords = async (
  setRecords: Dispatch<SetStateAction<string[]>>
) => {
  const keys = await localforage.keys()
  setRecords(keys)
  window.log.debug(`读取所有记录文件`)
}

export const exportRecord = async (id: string) => {
  const data = await localforage.getItem<LogType[]>(id)
  if (data) {
    window.electron.exportRecord(
      await logsToCSV(data),
      await statsToCSV(calcStatistics(data, 'id')),
      `在 ${dayjs(Number(id)).format('YYYY-MM-DD HH-mm-ss')} 创建的记录`
    )
    window.log.debug(`记录 [${id}] 导出记录文件`)
  }
}

export const removeRecord = async (
  id: string,
  setRecords: Dispatch<SetStateAction<string[]>>
) => {
  window.electron.showConfirm('确认删除这条记录吗？', async () => {
    await localforage.removeItem(id)
    await getRecords(setRecords)
    window.log.warn(`记录 [${id}] 删除记录文件`)
  })
}
