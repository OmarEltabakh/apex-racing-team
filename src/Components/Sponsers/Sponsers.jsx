import React from 'react';
import style from "./Sponsers.module.css";
import Slider from 'react-slick';
import SectionTitle from '../SectionTitle/SectionTitle';
import { sponsorsLogos, settings } from "./SliderSetting.js"


export default function Sponsers() {




  return <>

    <section className={`${style.sponsorsSection}   `}>

      <div className={`${style.sponsorsContainer}  `}>
        <SectionTitle title="Sponsors" />

        <div className={`${style.sliderContainer} `}>
          <Slider {...settings}>
            {sponsorsLogos.map((image, index) =>
              <img key={index} className=' px-4' src={image} alt="sponser_image" loading='lazy' />

            )}
          </Slider>

        </div>

      </div>
    </section>


  </>
}
