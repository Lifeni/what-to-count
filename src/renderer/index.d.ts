import log from 'electron-log'

type ViewType = 'home' | 'count'

export type LogType = {
  time: string
  input: string
}

export type StatType = {
  input: string
  count: number
}

declare global {
  interface Window {
    electron: {
      setView: (name: ViewType, value?: string) => void
      exportRecord: (logs: string, stats: string, name: string) => void
      showConfirm: (message: string, action: () => void) => void
    }
    log: log.LogFunctions
  }
}
