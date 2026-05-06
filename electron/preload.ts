import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  showMessageBox: (options: Electron.MessageBoxOptions) =>
    ipcRenderer.invoke('show-message-box', options),
  getAppVersion: (): Promise<string> => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
});
