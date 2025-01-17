import React from "react";
import Slider from "react-slick";
import style from "./Memebers.module.css";
import me from "../../Assets/omar.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./SliderSettings";



export default function Memebers() {

  return (

    <section className={`${style.membersSection}`}>

      <div className={`${style.membersContainer} myContainer`}>

        <h2>Our Members</h2>

        <Slider {...settings}  >

          {[1, 2, 3, 4].map((_, index) => (

            // memberCard
            <div key={index} className={`${style.memberCard}  mb-3 d-flex justify-content-center`}>

              <div className={`${style.memberCardWrapper}   `}>

                <div className={style.memberImage}>
                  <img className="w-100" src={me} alt="" />
                </div>

                <div className={style.memberNameAndRole}>
                  <h6>Omar Mohamed</h6>
                  <p>Head</p>
                </div>

                <div className={style.memberAccount}>
                  <i className="fa-brands fa-linkedin-in"></i>
                  <i className="fa-brands fa-github"></i>
                </div>

              </div>

            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
