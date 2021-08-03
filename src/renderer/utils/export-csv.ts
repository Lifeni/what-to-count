import dayjs from 'dayjs'
import { LogType, StatType } from '../index'
import { allMapping } from './mapping-handler'

export const logsToCSV = async (data: LogType[]): Promise<string> => {
  const header = ['序号, 输入, 映射, 时间']
  const all = await allMapping()
  const arr = data
    .sort((a, b) => dayjs(Number(a.time)).unix() - dayjs(Number(b.time)).unix())
    .map(
      (log, index) =>
        `${index + 1}, ${log.input}, ${
          all.find(a => a.input === log.input)?.name || ''
        }, ${dayjs(Number(log.time)).format('YYYY 年 MM 月 DD 日 HH:mm:ss')}`
    )
  window.log.debug(`执行 Logs 转换为 CSV`)
  return [...header, ...arr].join('\n')
}

export const statsToCSV = async (data: StatType[]): Promise<string> => {
  const header = ['输入, 映射, 计数']
  const all = await allMapping()
  const arr = data.map(
    log =>
      `${log.input}, ${
        all.find(a => a.input === log.input)?.name || '' || ''
      }, ${log.count}`
  )
  window.log.debug(`执行 Stats 转换为 CSV`)
  return [...header, ...arr].join('\n')
}
