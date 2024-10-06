// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

const api = {}

if(process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron',electronAPI)
    contextBridge.exposeInMainWorld('api',api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}