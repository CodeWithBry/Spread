import { useState } from 'react'
import s from './HeroSection.module.css'

function HeroSection() {
  return (
    <div className={s.heroSection}>
      <div className={s.top}>
        <h1>Latest News To Discover</h1>
        <p>Breaking news and comprehensive coverage of international events, global politics, and worldwide developments</p>
      </div>
    </div>
  )
}

export default HeroSection