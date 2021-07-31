import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  view: (name: string) => ipcRenderer.send('view', name),
})
