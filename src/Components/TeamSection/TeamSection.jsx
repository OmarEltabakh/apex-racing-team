import React from 'react'
import style from "./TeamSection.module.css"
import Button from './Button'
import { motion } from 'framer-motion'
import { Tilt } from 'react-tilt'
import { defaultOptions } from './Tilt'
import { childVariants, devVariances } from "./TeamSectionAnimation"
import { cards } from "./CardImages";




export default function TeamSection() {



  return <>

    <section className={`${style.TeamSection} d-flex justify-content-center align-items-center`}>


      <div className={`${style.container} myContainer  `}>

        <motion.h2
          viewport={{ once: true }}
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        >Our Teams</motion.h2>

        <motion.div
          variants={devVariances}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className={`${style.row} row w-100 m-auto `}>

          {cards.map((card, index) =>

            <motion.div variants={childVariants} key={index} className=" col-8 col-xl-3  col-lg-4 col-md-5 col-sm-6 ">
              <Tilt options={defaultOptions}>
                <div className={`${style.card} shadow w-100 p-2 rounded-1 py-3 cursorPointer `}>

                  <img className='w-100' src={card.img} alt="" />

                  <Button />

                </div>
              </Tilt>


            </motion.div>

          )}


        </motion.div>
      </div>
    </section >





  </>
}
