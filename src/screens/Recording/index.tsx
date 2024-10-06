import { desktopCapturer, Menu } from 'electron'
import { chrome } from 'process'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { FcOpenedFolder, FcVideoCall } from "react-icons/fc"
import { Link } from 'react-router-dom'
// const { desktopCapturer, remote } = require('electron');

// const { dialog, Menu } = remote


const RecordingScreen = () => {

  const [videoSelectButtonText, setVideoSelectButtonText] = useState('Choose a Video Source')
  const [videoSources, setVideoSources] = useState<Electron.DesktopCapturerSource[]>([])
  const [selectedSource, setSelectedSource] = useState<Electron.DesktopCapturerSource>()

  console.log('window.electron::: ', window.electron)

  const videoElRef = useRef<HTMLVideoElement>()

  const getVideoSources = async () => {

    window.electron.ipcRenderer.invoke('GET_INPUT_SOURCES',)
      .then((sources: Electron.DesktopCapturerSource[]) => {
        console.log("🚀 ~ .then ~ sources:", sources)
        setVideoSources(sources)

        // const videoOptionsMenu = Menu.buildFromTemplate(sources.map((source) => {
        //   return {
        //     label: source.name,
        //     click: () => selectSource(source)
        //   }
        // }))
        // videoOptionsMenu.popup()
      })
      .catch((err) => {
        console.error(err)
      })


  }

  const selectSource = async (source: Electron.DesktopCapturerSource) => {

    const constraints: MediaStreamConstraints = {
      audio: false,
      video: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id
        }
      }
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints)

    videoElRef.current.srcObject = stream
    videoElRef.current.play()

  }

  return (
    <div className=''>
      <Link to="/" className='ms-4'> {'<-'}Back</Link>
      <hr className='h-2' />
      <div className="flex flex-col">
        <h1 className=' text-3xl '>⚡ Electron Screen Recorder</h1>

        <video ref={videoElRef} className='max-w-[720px]' />

        <div className="flex items-center justify-center gap-2">
          <button disabled={!videoSources.length} className="px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-950 flex items-center gap-2 border-emerald-500 border-2 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-900"><FcVideoCall size={18} /> Start</button>
          <button disabled={!videoSources.length} className="px-3 py-1.5 rounded-md bg-red-100 text-red-950 flex items-center gap-2 border-red-500 border-2 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-900"> 🛑🫷 Stop</button>
        </div>
        <hr className='h-2 m-2' />

        <div className="w-max">
          <button
            className="px-3 py-1.5 border-2 rounded-md mx-auto flex items-center gap-2"
            onClick={getVideoSources}
          >
            {selectedSource ?
              <><strong>Record:</strong> {selectedSource.name}</> :
              <><FcOpenedFolder /> {videoSelectButtonText}</>
            }
          </button>

          <ul className='flex flex-col gap-y-3 w-full'>
            {videoSources.map((src) => (
              <li
                key={src.id}
                className='py-2 px-3 rounded-md border-2 cursor-pointer'
                onClick={() => {
                  setSelectedSource(src)
                  selectSource(src)
                }}
              >
                {src.name}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default RecordingScreen
