import React from 'react'
import { Link } from 'react-router-dom'

const RecordingScreen = () => {
  return (
    <div className=''>
      <Link to="/" className='ms-4'> {'<-'}Back</Link>
      <hr className='h-2' />
      <div className="w-full h-screen flex flex-col">
        <h1 className=' text-3xl '>⚡ Electron Screen Recorder</h1>

        <video></video>

        <button  className="button is-primary flex">Start</button>
        <button  className="button is-warning flex">Stop</button>
        <hr className='h-2' />

        <button className="button is-text">
          Choose a Video Source
        </button>


      </div>
    </div>
  )
}

export default RecordingScreen
