import React from 'react'
import style from "./HeroSlider.module.css"
import car1 from "../../Assets/HomeSection/car1.png"
import car2 from "../../Assets/HomeSection/car2.png"
import car3 from "../../Assets/HomeSection/car3.png"

export default function HeroSlider() {



  return <>

    <div id="carouselExampleIndicators" className="carousel slide w-100" data-bs-ride="carousel" data-bs-interval="2500">

      <div className="carousel-indicators position-absolute top-100 ">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div className="carousel-inner ">

        <div className="carousel-item active  ">
          <img src={car1} className="d-block w-90 m-auto " alt="formula" />
        </div>

        <div className="carousel-item">
          <img src={car2} className="d-block w-90 m-auto " alt="shell" />
        </div>

        <div className="carousel-item">
          <img src={car3} className="d-block w-90 m-auto " alt="ever" />
        </div>

      </div>

    </div>





  </>
}
