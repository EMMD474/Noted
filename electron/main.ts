import { app, BrowserWindow, ipcMain, dialog, Menu, utilityProcess } from 'electron';
import type { UtilityProcess } from 'electron';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const isDev = process.env.NODE_ENV !== 'production';
const PORT = 3000;

let mainWindow: BrowserWindow | null = null;
let serverProcess: UtilityProcess | null = null;

interface WindowState {
  width: number;
  height: number;
  x?: number;
  y?: number;
  isMaximized: boolean;
}

function getWindowStatePath(): string {
  return join(app.getPath('userData'), 'window-state.json');
}

function loadWindowState(): WindowState {
  const defaults: WindowState = { width: 1200, height: 800, isMaximized: false };
  try {
    const statePath = getWindowStatePath();
    if (existsSync(statePath)) {
      return { ...defaults, ...JSON.parse(readFileSync(statePath, 'utf-8')) };
    }
  } catch { /* ignore */ }
  return defaults;
}

function saveWindowState(win: BrowserWindow): void {
  try {
    const bounds = win.getNormalBounds();
    const state: WindowState = {
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      isMaximized: win.isMaximized(),
    };
    writeFileSync(getWindowStatePath(), JSON.stringify(state));
  } catch { /* ignore */ }
}

async function waitForServer(url: string, retries = 30, delayMs = 500): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  throw new Error(`Server at ${url} did not respond after ${retries} attempts`);
}

async function startProductionServer(): Promise<void> {
  const appPath = app.getAppPath();
  const serverScript = join(appPath, '.next/standalone/server.js');
  const serverCwd = join(appPath, '.next/standalone');

  if (!existsSync(serverScript)) {
    throw new Error(
      `Next.js standalone server not found.\nExpected: ${serverScript}\nRun "pnpm electron:build" to build the app first.`
    );
  }

  serverProcess = utilityProcess.fork(serverScript, [], {
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

function buildMenu(): void {
  const isMac = process.platform === 'darwin';

  const template: Electron.MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' as const },
              { type: 'separator' as const },
              { role: 'services' as const },
              { type: 'separator' as const },
              { role: 'hide' as const },
              { role: 'hideOthers' as const },
              { role: 'unhide' as const },
              { type: 'separator' as const },
              { role: 'quit' as const },
            ],
          },
        ]
      : []),
    {
      label: '&File',
      submenu: [isMac ? { role: 'close' as const } : { role: 'quit' as const }],
    },
    {
      label: '&Edit',
      submenu: [
        { role: 'undo' as const },
        { role: 'redo' as const },
        { type: 'separator' as const },
        { role: 'cut' as const },
        { role: 'copy' as const },
        { role: 'paste' as const },
        { role: 'selectAll' as const },
      ],
    },
    {
      label: '&View',
      submenu: [
        { role: 'reload' as const },
        { role: 'forceReload' as const },
        { role: 'toggleDevTools' as const },
        { type: 'separator' as const },
        { role: 'resetZoom' as const },
        { role: 'zoomIn' as const },
        { role: 'zoomOut' as const },
        { type: 'separator' as const },
        { role: 'togglefullscreen' as const },
      ],
    },
    {
      label: '&Window',
      submenu: [
        { role: 'minimize' as const },
        ...(isMac
          ? [{ type: 'separator' as const }, { role: 'front' as const }]
          : [{ role: 'close' as const }]),
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

async function createWindow(): Promise<void> {
  const state = loadWindowState();

  mainWindow = new BrowserWindow({
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
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
    if (mainWindow) saveWindowState(mainWindow);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (isDev) {
    mainWindow.loadURL(`http://localhost:${PORT}`);
  } else {
    try {
      await startProductionServer();
      await mainWindow.loadURL(`http://127.0.0.1:${PORT}`);
    } catch (err) {
      const error = err as Error;
      dialog.showErrorBox('Failed to start Noted', error.message);
      app.quit();
    }
  }
}

app.whenReady().then(async () => {
  buildMenu();
  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  serverProcess?.kill();
});

ipcMain.handle('show-message-box', async (_, options) => {
  if (!mainWindow) return;
  return dialog.showMessageBox(mainWindow, options);
});

ipcMain.handle('get-app-version', () => app.getVersion());
