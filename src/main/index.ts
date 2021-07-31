import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { pathToFileURL } from 'url'

const isDevelopment = process.env.NODE_ENV === 'development'

function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
    autoHideMenuBar: true,
  }).once('ready-to-show', () => {
    win.show()
  })
  if (isDevelopment) {
    win.loadURL('http://localhost:3000')
    win.webContents.toggleDevTools()
  } else {
    win.loadURL(
      pathToFileURL(join(__dirname, './renderer/index.html')).toString()
    )
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
