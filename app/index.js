'use strict'
const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain
} = require('electron')
const move = require('./rem/move')
const resize = require('./rem/resize')

let mainWindow
const isDev = process.env.NODE_ENV === 'development'

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 700, 
    height: 75,
    minWidth: 700,
    minHeight: 75,
    frame: false,
    transparent: true
  })

  move(mainWindow)
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  
  if (isDev) {
    mainWindow.webContents.openDevTools()
    
    const installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err))
  }

  
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  const ret = globalShortcut.register('Alt+Space', () => {
    if (mainWindow.isFocused()) mainWindow.hide()
    else mainWindow.show()
  })

  if (!ret) {
    console.log('Global shortcut registration failed')
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('resize', (e, size = {}) => {
  resize(mainWindow, size)
})


