process.env.WP_ENV = process.env.WP_ENV || 'noWP';

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// var ipc = electron.ipcRenderer;
// var webFrame = electron.webFrame;

const path = require('path')
const url = require('url')

// var _browser_zoomLevel = 0;
// var _browser_maxZoom = 9;
// var _browser_minZoom = -8;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 768})
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // and load the index.html of the app.
  // if (process.env.WP_ENV === 'noWP') {
  //   mainWindow.loadURL(url.format({
  //     pathname: path.join(__dirname, '../dist/index.html'),
  //     protocol: 'file:',
  //     slashes: true
  //   }))
  // }
  // else {
  //   mainWindow.loadURL('http://localhost:4000')
  // }


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// ipc.on("zoomIn", function () {
//     if (_browser_maxZoom > _browser_zoomLevel) {
//         _browser_zoomLevel += 1;
//     }
//     webFrame.setZoomLevel(_browser_zoomLevel);
// });

// ipc.on("zoomOut", function () {
//     if (_browser_minZoom < _browser_zoomLevel) {
//         _browser_zoomLevel -= 1;
//     }
//     webFrame.setZoomLevel(_browser_zoomLevel);
// });

// ipc.on("zoomReset", function () {
//     _browser_zoomLevel = 0;
//     webFrame.setZoomLevel(_browser_zoomLevel);
// });
