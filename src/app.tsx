import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/Home'
import RecordingScreen from './screens/Recording'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<RecordingScreen />} />
      <Route path='/recording' element={<RecordingScreen/> } />
    </Routes>
  )
}

export default App