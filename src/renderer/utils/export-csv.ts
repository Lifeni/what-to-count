import dayjs from 'dayjs'
import { LogType } from '../index'

export const JSONToCSV = (data: LogType[]): string => {
  const header = ['序号, 输入, 时间,']
  const arr = data
    .sort((a, b) => dayjs(Number(a.time)).unix() - dayjs(Number(b.time)).unix())
    .map(
      (log, index) =>
        `${index + 1}, ${log.name}, ${dayjs(Number(log.time)).format(
          'YYYY 年 MM 月 DD 日 HH:mm:ss'
        )},`
    )
  return [...header, ...arr].join('\n')
}
