"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const fs_1 = require("fs");
const isDev = process.env.NODE_ENV !== 'production';
const PORT = 3000;
let mainWindow = null;
let serverProcess = null;
function getWindowStatePath() {
    return (0, path_1.join)(electron_1.app.getPath('userData'), 'window-state.json');
}
function loadWindowState() {
    const defaults = { width: 1200, height: 800, isMaximized: false };
    try {
        const statePath = getWindowStatePath();
        if ((0, fs_1.existsSync)(statePath)) {
            return { ...defaults, ...JSON.parse((0, fs_1.readFileSync)(statePath, 'utf-8')) };
        }
    }
    catch { /* ignore */ }
    return defaults;
}
function saveWindowState(win) {
    try {
        const bounds = win.getNormalBounds();
        const state = {
            width: bounds.width,
            height: bounds.height,
            x: bounds.x,
            y: bounds.y,
            isMaximized: win.isMaximized(),
        };
        (0, fs_1.writeFileSync)(getWindowStatePath(), JSON.stringify(state));
    }
    catch { /* ignore */ }
}
async function waitForServer(url, retries = 30, delayMs = 500) {
    for (let i = 0; i < retries; i++) {
        try {
            await fetch(url);
            return;
        }
        catch {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    throw new Error(`Server at ${url} did not respond after ${retries} attempts`);
}
async function startProductionServer() {
    const appPath = electron_1.app.getAppPath();
    const serverScript = (0, path_1.join)(appPath, '.next/standalone/server.js');
    const serverCwd = (0, path_1.join)(appPath, '.next/standalone');
    if (!(0, fs_1.existsSync)(serverScript)) {
        throw new Error(`Next.js standalone server not found.\nExpected: ${serverScript}\nRun "pnpm electron:build" to build the app first.`);
    }
    serverProcess = electron_1.utilityProcess.fork(serverScript, [], {
        cwd: serverCwd,
        env: {
            ...process.env,
            PORT: String(PORT),
            NODE_ENV: 'production',
            HOSTNAME: '127.0.0.1',
        },
        stdio: 'pipe',
    });
    await waitForServer(`http://127.0.0.1:${PORT}`);
}
function buildMenu() {
    const isMac = process.platform === 'darwin';
    const template = [
        ...(isMac
            ? [
                {
                    label: electron_1.app.name,
                    submenu: [
                        { role: 'about' },
                        { type: 'separator' },
                        { role: 'services' },
                        { type: 'separator' },
                        { role: 'hide' },
                        { role: 'hideOthers' },
                        { role: 'unhide' },
                        { type: 'separator' },
                        { role: 'quit' },
                    ],
                },
            ]
            : []),
        {
            label: '&File',
            submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
        },
        {
            label: '&Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectAll' },
            ],
        },
        {
            label: '&View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ],
        },
        {
            label: '&Window',
            submenu: [
                { role: 'minimize' },
                ...(isMac
                    ? [{ type: 'separator' }, { role: 'front' }]
                    : [{ role: 'close' }]),
            ],
        },
    ];
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
}
async function createWindow() {
    const state = loadWindowState();
    mainWindow = new electron_1.BrowserWindow({
        width: state.width,
        height: state.height,
        x: state.x,
        y: state.y,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        title: 'Noted',
        show: false,
        backgroundColor: '#121212',
    });
    if (state.isMaximized) {
        mainWindow.maximize();
    }
    mainWindow.once('ready-to-show', () => {
        mainWindow?.show();
    });
    mainWindow.on('close', () => {
        if (mainWindow)
            saveWindowState(mainWindow);
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    if (isDev) {
        mainWindow.loadURL(`http://localhost:${PORT}`);
    }
    else {
        try {
            await startProductionServer();
            await mainWindow.loadURL(`http://127.0.0.1:${PORT}`);
        }
        catch (err) {
            const error = err;
            electron_1.dialog.showErrorBox('Failed to start Noted', error.message);
            electron_1.app.quit();
        }
    }
}
electron_1.app.whenReady().then(async () => {
    buildMenu();
    await createWindow();
    electron_1.app.on('activate', async () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            await createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('before-quit', () => {
    serverProcess?.kill();
});
electron_1.ipcMain.handle('show-message-box', async (_, options) => {
    if (!mainWindow)
        return;
    return electron_1.dialog.showMessageBox(mainWindow, options);
});
electron_1.ipcMain.handle('get-app-version', () => electron_1.app.getVersion());
