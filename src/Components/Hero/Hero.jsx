import React from 'react'
import style from "./Hero.module.css"
import HeroSlider from '../HeroSlider/HeroSlider'


export default function Hero() {



  return <>

    <section className={`${style.Hero}  position-relative`}>
      <div className={`${style.layer} `} />

      <div className={`${style.container} myContainer  h-100 `}>

        {/* hero content============================================> */}
        <div className={`${style.content}  `}>

          <h1 className='m-0 '>Welcome to Apex</h1>
          <p className='m-0  w-95 '>We are an electric vehicle team founded in 2018 by students of the Higher Technological Institute, competing locally and internationally.</p>

          <div className={`${style.buttons}    `}>
            <button className={`${style.btn1}`}>Sign In</button>
            <button className={`${style.btn2}`}>Sign Up</button>
          </div>

        </div>

        {/* hero slider===============================================> */}
        <div className={`${style.sliderContainer}   d-flex justify-content-end`}>

          <HeroSlider />

        </div>

      </div>


    </section>





  </>
}
