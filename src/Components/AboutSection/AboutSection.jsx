import React from 'react'
import style from "./AboutSection.module.css"
import teamImage from "../../Assets/HomeImage.jpg"
import { motion } from 'framer-motion'

export default function AboutSection() {

  const motionSettings = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: "easeInOut" },
  };

  return <>

    <section className={`${style.AboutSection}  d-flex align-item-center  overflow-hidden `}>

  
      <div className={`${style.container} myContainer`}>

        {/* aboutContent ==============================================> */}

        <div className={`${style.content} `}>

          <motion.h2
            {...motionSettings}
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
          >About APEX</motion.h2>

          <motion.p
            {...motionSettings}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            className='w-90'
          > We are an electric vehicle team that started in
            2018 from students of the Higher Technological
            Institute, 10th of Ramadan. We participate in
            many competitions inside and outside Egypt
            We are an electric vehicle team that started in
            2018 from students of the Higher Technological
            Institute, 10th of Ramadan. We participate in
            many competitions inside and outside Egypt</motion.p>

          <motion.button
          className='shadow'
            {...motionSettings}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: .1 }}
          >Learn More</motion.button>

        </div>

        {/* aboutImage=================================================> */}
        <div className={`${style.aboutImage} `}>

          <motion.img
            {...motionSettings}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            className='w-95 ' src={teamImage} alt="apex racing team" />

        </div>


      </div>


    </section>





  </>
}
