const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
// const express = require('express')
const i18n = require('i18n')

require('electron-reload')(__dirname)
let win
const createWindow = () => {
  win = new BrowserWindow({
    title: 'Refresh Browser',
    darkTheme: true,
    vibrancy: 'dark',
    useContentSize: true,
    offscreen: true,
    show: false,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      backgroundThrottling: false
    }
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/main/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.openDevTools()
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('resize', () => {
    const { width, height } = win.getBounds()
    if (!win.isMaximized()) {
      return true
    }
    return false
  })
  win.on('closed', () => {
    win = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
i18n.configure({
  locales: ['en', 'de'],
  register: global,
  directory: path.join(__dirname, '/locale')
})
i18n.setLocale('en')
console.log(__('hello'))

/* Start */

let link

app.on('open-url', function (event, data) {
  event.preventDefault()
  link = data
})

console.log(link)
