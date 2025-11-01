const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
                                         contextIsolation: true,
                                         nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html');
}

// Define the application menu
function createMenu() {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New…',
                    accelerator: 'CmdOrCtrl+N',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'file-new');
                        }
                    }
                },
                {
                    label: 'Open…',
                    accelerator: 'CmdOrCtrl+O',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'file-open');
                        }
                    }
                },
                {
                    label: 'Open Home…',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'file-recent');
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'file-save');
                        }
                    }
                },
                {
                    label: 'Save As…',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'file-save-as');
                        }
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'edit-undo');
                        }
                    }
                },
                {
                    label: 'Redo',
                    accelerator: 'CmdOrCtrl+Shift+Z',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'edit-redo');
                        }
                    }
                },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        },
        {
            label: 'Insert',
            submenu: [
                {
                    label: 'Image…',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'insert-image');
                        }
                    }
                },
                {
                    label: 'Text',
                    accelerator: 'CmdOrCtrl+T',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'insert-text');
                        }
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Fit to Screen',
                    accelerator: 'F',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'view-fit');
                        }
                    }
                },
                {
                    label: 'Actual Size (100%)',
                    accelerator: 'CmdOrCtrl+0',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'view-actual');
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Toggle Grid',
                    accelerator: 'G',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'view-grid');
                        }
                    }
                },
                {
                    label: 'Toggle Tabs',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'view-tabs');
                        }
                    }
                },
                { type: 'separator' },
                { role: 'toggleDevTools' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Settings…',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'help-settings');
                        }
                    }
                },
                {
                    label: 'About',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.send('menu-action', 'help-about');
                        }
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
    createMenu();
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
