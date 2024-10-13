import React from 'react'
import { Link } from 'react-router-dom'
import UseAnimations from 'react-useanimations'
import activityIcon from 'react-useanimations/lib/activity'
import { AuroraBackground } from '../../components/ui/AuroraBackground'
import { motion } from "framer-motion"

const HomeScreen = () => {
  return (
    <AuroraBackground showRadialGradient>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Screen & App Recorder
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          A Clean and Elegant Screen Recorder
        </div>
        <Link to='/recording' className='flex items-center gap-2 z-[1] mx-auto border-2 border-rose-500 bg-rose-100 hover:border-rose-500 rounded-lg py-2 px-4 shadow-md hover:shadow-xl shadow-rose-300 hover:shadow-rose-500 hover:bg-rose-500 hover:text-white group animate transition-all duration-300 font-semibold'>
          Continue
          <UseAnimations animation={activityIcon} size={28} loop className='group-hover:invert' />
        </Link>
      </motion.div>


      {/* <div className='grid place-content-center h-full'>
        <h1 className='text-7xl text-white mb-5 flex gap-2 tracking-wide'>
          Screen & App Recorder
        </h1>
        <h2 className='text-white text-2xl mx-auto mb-6'>
          A Clean and Elegant Screen Recorder
        </h2>
      </div> */}

    </AuroraBackground>
  )
}

export default HomeScreen