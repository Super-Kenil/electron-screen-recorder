import { motion } from "framer-motion"
import React from 'react'
import { Link } from 'react-router-dom'
import UseAnimations from 'react-useanimations'
import activityIcon from 'react-useanimations/lib/activity'

import { AuroraBackground } from '../../components/ui/AuroraBackground'

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
        {/* <Link to='/recording' className='flex items-center gap-2 z-[1] mx-auto border-2 border-rose-500 bg-rose-100 hover:border-rose-500 rounded-lg py-2 px-4 shadow-md hover:shadow-xl shadow-rose-300 hover:shadow-rose-500 hover:bg-rose-500 hover:text-white group animate transition-all duration-300 font-semibold'>
          Continue
          <UseAnimations animation={activityIcon} size={28} loop className='group-hover:invert' />
        </Link> */}
        <Link to='/recording' className="scale-125 bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <span className='flex gap-2'>
              Continue
              <UseAnimations animation={activityIcon} size={20} loop className='invert' />
            </span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </Link>

      </motion.div>

    </AuroraBackground>
  )
}

export default HomeScreen