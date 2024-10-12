import { Buffer } from 'buffer'
import React, { startTransition, useRef, useState } from 'react'
import { FcOpenedFolder, FcVideoCall } from "react-icons/fc"
import { Link } from 'react-router-dom'
import UseAnimations from 'react-useanimations'
import arrowLeftCircle from 'react-useanimations/lib/arrowLeftCircle'

const RecordingScreen = () => {

  const [videoSources, setVideoSources] = useState<Electron.DesktopCapturerSource[]>([])
  const [selectedSource, setSelectedSource] = useState<Electron.DesktopCapturerSource>()
  const [isRecording, setIsRecording] = useState(false)

  const videoElRef = useRef<HTMLVideoElement>()
  const streamRecorderRef = useRef<MediaRecorder>(null)

  let recordedChunks: Blob[] = []

  const getVideoSources = async () => {
    window.electron.ipcRenderer.invoke('GET_INPUT_SOURCES').then((sources: Electron.DesktopCapturerSource[]) => setVideoSources(sources))
  }

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
    <div>
      <Link to="/" className='ms-2 flex gap-2 my-2'>
        <UseAnimations animation={arrowLeftCircle} size={28} loop autoplay />
        Back
      </Link>
      <hr className='h-2' />
      <div className="flex flex-col">
        <h1 className=' text-3xl '>⚡ Electron Screen Recorder</h1>

        <video ref={videoElRef} className='max-w-[720px] rounded-lg mx-auto my-4' />

        <div className="mx-auto">

          {isRecording ?
            <button
              className="px-3 py-1.5 rounded-md bg-red-100 text-red-950 flex items-center gap-2 border-red-500 border-2 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-900"
              onClick={() => handleStopRecording(selectedSource)}
            >
              🛑🫷 Stop
            </button>
            :
            <button
              disabled={!selectedSource}
              className="px-3 py-1.5 rounded-md bg-emerald-100 text-emerald-950 flex items-center gap-2 border-emerald-500 border-2 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-900"
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
            {videoSources.map((src) => (
              <li
                key={src.id}
                className='py-2 px-3 rounded-md border-2 cursor-pointer'
                onClick={() => {
                  selectSource(src)
                  startTransition(() => {
                    setSelectedSource(src)
                  })
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
