import { Buffer } from 'buffer'
import type { DesktopCapturerSource } from 'electron'
import React, { startTransition, useRef, useState } from 'react'
import { FcOpenedFolder, FcVideoCall } from "react-icons/fc"
import { Link } from 'react-router-dom'
import UseAnimations from 'react-useanimations'
import arrowLeftCircle from 'react-useanimations/lib/arrowLeftCircle'

import { WavyBackground } from '../../components/ui/WavyBackground'
import { cn } from '../../utils/cn'

const RecordingScreen = () => {

  const [videoSources, setVideoSources] = useState<Array<Electron.DesktopCapturerSource>>([])
  const [selectedSource, setSelectedSource] = useState<Electron.DesktopCapturerSource>()
  const [isRecording, setIsRecording] = useState(false)

  const videoElRef = useRef<HTMLVideoElement>()
  const streamRecorderRef = useRef<MediaRecorder>(null)

  let recordedChunks: Blob[] = []

  const getVideoSources = async () => window.electron.ipcRenderer.invoke('GET_INPUT_SOURCES').then(setVideoSources)

  const selectSource = async (source: Electron.DesktopCapturerSource) => {
    const activeSource = source
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
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints)
    videoElRef.current.srcObject = stream
    videoElRef.current.play()
    const options: MediaRecorderOptions = { mimeType: 'video/webm; codecs=vp9' }
    streamRecorderRef.current = new MediaRecorder(stream, options)
    streamRecorderRef.current.ondataavailable = (event: BlobEvent) => recordedChunks.push(event.data)
    streamRecorderRef.current.onstop = () => handleStopRecording(activeSource)
  }

  const handleStopRecording = async (source: Electron.DesktopCapturerSource) => {
    streamRecorderRef.current.stop()
    setIsRecording(false)
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm; codecs=vp9'
      })
      const buffer: Buffer<ArrayBufferLike> = Buffer.from(await blob.arrayBuffer())
      const result = await window.electron.ipcRenderer.invoke('STOP_SCREEN_RECORDING', JSON.stringify(source), buffer,)
      if (result) alert('Recording saved successfully')
      else alert('Failed to save recording')
      recordedChunks = []
    }
  }

  const handleStartRecording = () => {
    if (selectedSource) {
      streamRecorderRef.current?.start()
      setIsRecording(true)
    }
  }

  return (
    <WavyBackground className='h-full w-full'>
      <div className='text-white'>
        <Link to="/" className='ms-2 flex gap-2 mb-2'>
          <UseAnimations animation={arrowLeftCircle} size={28} loop autoplay />
          Back
        </Link>
        <hr className='h-2' />
        <div className="flex flex-col">
          <h1 className=' text-3xl mx-auto mt-2'>⚡ Electron Screen Recorder</h1>
          <div className='mx-auto rounded-lg my-8 w-[720px] bg-gradient-to-r from-cyan-500 bg-slate-800' style={{ backgroundImage: `url(https://tailwindcss.com/img/background-pattern.svg)` }}>
            <video ref={videoElRef} className={cn('max-w-[720px] rounded-lg mx-auto my-4 border-white', { 'border-2': selectedSource })} />
          </div>
          <div className="mx-auto">
            {isRecording ?
              <button
                className="px-3 py-1.5 rounded-md bg-red-100 text-red-950 flex items-center gap-2 border-red-500 border-2 disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-900"
                onClick={() => handleStopRecording(selectedSource)}
              >
                🛑🫷 Stop
              </button>
              :
              <button
                disabled={!selectedSource}
                className="px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-950 flex items-center gap-2 border-emerald-500 border-2 disabled:bg-slate-300 disabled:border-slate-400 disabled:text-slate-900"
                onClick={handleStartRecording}
              >
                <FcVideoCall size={18} /> Start
              </button>
            }
          </div>
          <hr className='h-2 m-2' />
          <div className="w-max">
            <button
              className="px-3 py-1.5 border-2 rounded-md mx-auto flex items-center gap-2"
              onClick={getVideoSources}
            >
              {selectedSource ?
                <><strong>Record:</strong> {selectedSource.name}</> :
                <><FcOpenedFolder /> Choose a Video Source</>
              }
            </button>
            <ul className='flex flex-col gap-y-3 w-full'>
              {videoSources.map((src: DesktopCapturerSource) => (
                <li key={src.id} className='py-2 px-3 rounded-md border-2 cursor-pointer' onClick={() => {
                  selectSource(src)
                  startTransition(
                    () => {
                      setSelectedSource(src)
                    }
                  )
                }}
                >
                  {typeof src.thumbnail === 'string' && <img src={src.thumbnail} alt={src.name} />}
                  {src.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}

export default RecordingScreen
