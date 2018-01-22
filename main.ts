/**
 * File Author: Zheng Liping
 * Create time: 2017-10-22 10:21:13
 * Modify time: 2017-10-22 10:20:43
 */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600, frame: false,
        transparent: false,
        backgroundColor: '#ffffff'});
    // mainWindow.loadURL(`file://${__dirname}/dist/index.html`); // on prod load on file.
    mainWindow.loadURL('http://localhost:8080', {webPreferences: {webSecurity: false}});
    // mainWindow.loadURL('file://' + __dirname + '/dist/index.html', {webPreferences: {webSecurity: false}});
    // mainWindow.loadURL('file://' + __dirname + '/dist/index.html', {webPreferences: {webSecurity: false}});

    mainWindow.setMenu(null);
    mainWindow.webContents.openDevTools({detach: true});
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('window.control', (event, data) => {
    const window = BrowserWindow.getFocusedWindow();

    switch (data) {
        case 'minimize':
            window.minimize();
            break;
        case 'maximize':
            window.maximize();
            break;
        case 'unmaximize':
            window.unmaximize();
            break;
        case 'close':
            window.close();
            break;
        case 'openconsole':
            mainWindow.webContents.openDevTools();
            break;
    }
});
