import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  setView: (name: string, value: string) =>
    ipcRenderer.send('view', name, value),
})
