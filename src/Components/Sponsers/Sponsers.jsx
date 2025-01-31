import React from 'react';
import style from "./Sponsers.module.css";
import Slider from 'react-slick';
import SectionTitle from '../SectionTitle/SectionTitle';
import { settings } from "./SliderSetting.js"
import logo1 from "../../Assets/SponsersLogo/logo1.webp"
import logo2 from "../../Assets/SponsersLogo/logo2.webp"
import logo3 from "../../Assets/SponsersLogo/logo3.webp"
import logo4 from "../../Assets/SponsersLogo/logo4.webp"
import logo5 from "../../Assets/SponsersLogo/16.png"
import logo6 from "../../Assets/SponsersLogo/24.png"

const sponsorsLogos = [logo1, logo2, logo3, logo4, logo6,logo5]

export default function Sponsers() {




  return <>

    <section className={`${style.sponsorsSection}    `}>

      <div className={`${style.sponsorsContainer}   `}>
        <SectionTitle title="Sponsors" />

        <div className={`${style.sliderContainer} `}>
          <Slider {...settings}>
            {sponsorsLogos.map((image, index) =>
              <img key={index} className={`${image === logo5 ? "px-0 " : image === logo6 ? "px-0  " : "px-5"}`} src={image} alt="sponser_image" loading='lazy' />

            )}
          </Slider>

        </div>

      </div>
    </section>


  </>
}
