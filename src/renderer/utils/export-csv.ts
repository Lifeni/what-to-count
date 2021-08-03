import dayjs from 'dayjs'
import { LogType, StatType } from '../index'

export const logsToCSV = (data: LogType[]): string => {
  const header = ['序号, 输入, 时间']
  const arr = data
    .sort((a, b) => dayjs(Number(a.time)).unix() - dayjs(Number(b.time)).unix())
    .map(
      (log, index) =>
        `${index + 1}, ${log.name}, ${dayjs(Number(log.time)).format(
          'YYYY 年 MM 月 DD 日 HH:mm:ss'
        )}`
    )
  window.log.debug(`执行 Logs 转换为 CSV`)
  return [...header, ...arr].join('\n')
}

export const statsToCSV = (data: StatType[]): string => {
  const header = ['输入, 计数']
  const arr = data.map((log, index) => `${log.name}, ${log.count}`)
  window.log.debug(`执行 Stats 转换为 CSV`)
  return [...header, ...arr].join('\n')
}
