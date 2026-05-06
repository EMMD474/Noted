"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    showMessageBox: (options) => electron_1.ipcRenderer.invoke('show-message-box', options),
    getAppVersion: () => electron_1.ipcRenderer.invoke('get-app-version'),
    platform: process.platform,
});
