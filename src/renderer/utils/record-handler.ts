import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import localforage from 'localforage'
import { Dispatch, SetStateAction } from 'react'
import { LogType } from '..'
import { calcStatistics } from './calc-statistics'
import { logsToCSV, statsToCSV } from './export-csv'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

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

export const filterRecord = async (from: string, to: string, input: string) => {
  const keys = await localforage.keys()
  let data = []
  let name = ''
  for (const key of keys) {
    const records = await localforage.getItem<LogType[]>(key)
    if (records) data.push(...records)
  }

  if (input !== '') {
    data = data.filter(d => d.input === input)
    name += `编号 ${input} `
  }
  if (from !== '' && to !== '') {
    data = data.filter(
      d =>
        dayjs(Number(d.time)).isSameOrAfter(dayjs(from)) &&
        dayjs(Number(d.time)).isBefore(dayjs(to).add(1, 'day'))
    )
    name += `在 ${from} 到 ${to} 的记录`
  } else if (from !== '' && to === '') {
    data = data.filter(d => dayjs(Number(d.time)).isSameOrAfter(dayjs(from)))
    name += `在 ${from} 到 ${dayjs().format('YYYY-MM-DD')} 的记录`
  } else if (to !== '' && from === '') {
    data = data.filter(d =>
      dayjs(Number(d.time)).isBefore(dayjs(to).add(1, 'day'))
    )
    name += `在最初到 ${dayjs().format('YYYY-MM-DD')} 为止的记录`
  }

  window.electron.exportRecord(
    await logsToCSV(data),
    await statsToCSV(calcStatistics(data, 'id')),
    name
  )
  window.log.debug(`记录 [${name}] 导出记录文件`)
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
