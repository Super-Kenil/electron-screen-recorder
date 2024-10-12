import React from 'react'
import { Link } from 'react-router-dom'
import UseAnimations from 'react-useanimations'
import activityIcon from 'react-useanimations/lib/activity'

const HomeScreen = () => {
  return (
    <div className='grid place-content-center h-full'>
      <Link to='/recording' className='flex items-center gap-2 border-2 border-indigo-500 bg-indigo-100 hover:border-indigo-500 rounded-lg py-2 px-4 shadow-md hover:shadow-xl shadow-indigo-300 hover:shadow-indigo-500 hover:bg-indigo-500 hover:text-white group animate transition-all duration-300 font-semibold'>
        Continue
        <UseAnimations animation={activityIcon} size={28} loop  className='group-hover:invert'/>
      </Link>
    </div>
  )
}

export default HomeScreen