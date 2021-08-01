import { fail } from 'assert/strict'
import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { pathToFileURL } from 'url'

const isDevelopment = process.env.NODE_ENV === 'development'

let homeWin: BrowserWindow | null = null
let countWin: BrowserWindow | null = null

const createHomeWindow = () => {
  homeWin = new BrowserWindow({
    width: 720,
    height: 540,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, './preload.js'),
    },
    show: false,
    autoHideMenuBar: true,
    resizable: false,
  })
    .once('ready-to-show', () => {
      homeWin?.show()
    })
    .on('closed', () => {
      homeWin = null
    })

  if (isDevelopment) {
    homeWin.loadURL('http://localhost:3000')
    homeWin.webContents.toggleDevTools()
  } else {
    homeWin.loadURL(
      pathToFileURL(join(__dirname, './renderer/index.html')).toString()
    )
  }
}

const createCountWindow = (name: string) => {
  countWin = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, './preload.js'),
    },
    show: false,
    autoHideMenuBar: true,
  })
    .once('ready-to-show', () => {
      countWin?.show()
    })
    .on('closed', () => {
      countWin = null
    })

  if (isDevelopment) {
    countWin.loadURL(`http://localhost:3000/#${name}`)
    countWin.webContents.toggleDevTools()
  } else {
    countWin.loadURL(
      pathToFileURL(join(__dirname, './renderer/index.html')).toString()
    )
  }
}

app.whenReady().then(createHomeWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createHomeWindow()
  }
})

ipcMain.on('view', (e, name, value) => {
  switch (name) {
    case 'home': {
      if (!homeWin) createHomeWindow()
      else homeWin.focus()
      break
    }
    case 'count': {
      if (!countWin) {
        createCountWindow(value)
      } else countWin.focus()
      break
    }
  }
})
