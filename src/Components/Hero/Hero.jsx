import React from 'react';
import style from "./Hero.module.css";
import HeroSlider from '../HeroSlider/HeroSlider';
import { motion } from 'framer-motion';
import { pVariants, spanVariants, motionSettings, transitions } from './HeroAnimation';



export default function Hero() {

  // text Animation======================================================>
  const textAnimation = "Welcome to Apex";



  return <>

    <section id='Home' className={`${style.Hero}  position-relative`}>

      <div className={`${style.layer} `} />

      <div className={`${style.container} myContainer   h-100 `}>

        {/* hero content=============================================================> */}
        <div className={`${style.content}   `}>

          <motion.h1 variants={pVariants} initial="hidden" animate="visible" >
            {textAnimation.split("").map((letter, index) => {
              return <motion.span key={index} variants={spanVariants} >
                {letter}
              </motion.span>
            })}
          </motion.h1>

          <p className='w-95 '>We are an electric vehicle team founded in 2018 by students of the Higher Technological Institute, competing locally and internationally.</p>

          {/* sign in and sign up button================================================> */}
          <div className={`${style.buttons}    `}>
            <motion.button {...motionSettings} transition={transitions.signIn} className={`${style.btn1}`}>
              Sign In
            </motion.button>

            <motion.button {...motionSettings} transition={transitions.signUp} className={`${style.btn2}`}>
              Sign Up
            </motion.button>
          </div>

        </div>

        {/* hero slider=================================================================> */}
        <div className={`${style.sliderContainer}    d-flex justify-content-end`}>

          <HeroSlider />

        </div>

      </div>


    </section>





  </>
}
