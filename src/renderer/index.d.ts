type ViewType = 'home' | 'count'

export type LogType = {
  time: string
  name: string
}

export type StatType = {
  name: string
  count: number
}

declare global {
  interface Window {
    electron: {
      setView: (name: ViewType, value?: string) => void
    }
  }
}
