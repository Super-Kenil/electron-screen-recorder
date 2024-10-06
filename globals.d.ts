import type { IpcRenderer } from 'electron'

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined
declare const MAIN_WINDOW_VITE_NAME: string | undefined

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
} 