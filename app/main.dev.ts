/* eslint global-require: off, no-console: off  */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */

import path from 'path'
import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import MenuBuilder from './menu'

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}

let mainWindow: BrowserWindow | null = null

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')()
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS']

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

let reminderTimerIsRunning = false

// eslint-disable-next-line no-return-assign
const setReminderTimerIsActive = setReminderTimerTo =>
  (reminderTimerIsRunning = setReminderTimerTo)

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions()
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1440,
    minWidth: 1220,
    height: 1024,
    minHeight: 600,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            backgroundThrottling: false,
            nodeIntegration: true
          }
        : {
            backgroundThrottling: false,
            preload: path.join(__dirname, 'dist/renderer.prod.js')
          },
    titleBarStyle: 'hidden'
  })

  const setWindowActive = () => {
    setReminderTimerIsActive(false)
    mainWindow.restore() // restore from minimized state
    mainWindow.show()
    mainWindow.setVisibleOnAllWorkspaces(true) // put the window on all screens
  }

  const setWindowHidden = () => {
    setReminderTimerIsActive(true)
    mainWindow.minimize()
  }

  /*
  Makes globally importable in React as:

  const {
    setWindowActive,
    setWindowHidden
  } = require('electron').remote.getGlobal('windowUtils');

  and then just use by calling, e.g.: setWindowHidden() or setWindowActive()
  */
  global.windowUtils = {
    setReminderTimerIsActive,
    setWindowActive,
    setWindowHidden
  }

  /* If the user blurs the window without starting the timer, the app will repatedly pop up again every minute */
  app.on('browser-window-blur', () => {
    if (!reminderTimerIsRunning) {
      setTimeout(() => {
        if (!reminderTimerIsRunning) {
          /* Since the timer started 1 minute ago, at this specific point in time, 
             the "Start mobbing" button might have been clicked already.
             Checking for it before setting the window to active again to prevent disturbing a session
          */

          setWindowActive()
        }
      }, 60000)
    }
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()

  // TODO: Uncomment and use new AppUpdater() once we want to use auto updates
  // eslint-disable-next-line
  // new AppUpdater()
})
