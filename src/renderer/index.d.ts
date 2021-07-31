export {}

type ViewType = 'home' | 'count'

declare global {
  interface Window {
    electron: {
      view: (name: ViewType) => void
    }
  }
}
