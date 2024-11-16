import React from 'react'
import style from "./Hero.module.css"
import car1 from "../../Assets/HomeSection/car1.png"
import car2 from "../../Assets/HomeSection/car2.png"
import car3 from "../../Assets/HomeSection/car3.png"

export default function Hero() {



  return <>

    <section className={`${style.Hero}  position-relative`}>
      <div className={`${style.layer} `} />

      <div className={`${style.container} myContainer  h-100 `}>

        {/* hero content============================================> */}
        <div className={`${style.content} redborder `}>

          <h1 className='m-0 '>Welcome to Apex</h1>
          <p className='m-0  w-95 '>We are an electric vehicle team founded in 2018 by students of the Higher Technological Institute, competing locally and internationally.</p>

          <div className={`${style.buttons}    `}>
            <button className={`${style.btn1}`}>Sign In</button>
            <button className={`${style.btn2}`}>Sign Up</button>
          </div>

        </div>

        {/* hero slider===============================================> */}
        <div className={`${style.sliderContainer}   d-flex justify-content-end  redborder  `}>

          <div id="carouselExampleIndicators" className="carousel slide w-100" data-bs-ride="carousel" data-bs-interval="2500">

            <div className="carousel-indicators position-absolute top-100 ">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner ">

              <div className="carousel-item active ">
                <img src={car1} className="d-block w-100 " alt="..." />
              </div>

              <div className="carousel-item">
                <img src={car2} className="d-block w-100 " alt="..." />
              </div>

              <div className="carousel-item">
                <img src={car3} className="d-block w-100 " alt="..." />
              </div>

            </div>

          </div>

        </div>

      </div>


    </section>





  </>
}
