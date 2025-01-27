/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useMemo } from 'react';
import Slider from "react-slick";
import "./HeroSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { galleryContext } from '../../Context/GalleryContext';
import settings from "./SliderSetting.js";

export default function HeroSlider() {

  const { galleryData } = useContext(galleryContext);

  const carsData = useMemo(() => {
    return galleryData?.filter(item => item.category === 'cars') || [];
  }, [galleryData]);


  return (
    <section className="heroSliderSection w-100">
      <div className="heroSliderContainer myContainer">

        <Slider {...settings}>
          {carsData.length > 0 ? (
            carsData.map((item, index) => (
              <div key={item._id || index} className="heroSliderItem">
                <img
                  src={item.Image.secure_url}
                  className="d-block w-100"
                  alt={`Car image ${item?.title}`}
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            <div>No cars available</div>
          )}
        </Slider>

      </div>
    </section>
  );
}
