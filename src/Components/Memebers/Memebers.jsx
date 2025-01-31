import React from "react";
import Slider from "react-slick";
import style from "./Memebers.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./SliderSettings";
import placeHolderImage from "../../Assets/placeholder-image-person-jpg.webp";

export default function Memebers({ members }) {


  if (!members || members.length === 0) {
    return <h2 className="text-center mb-5">No members available.</h2>;
  }


  return (
    <section className={`${style.membersSection} `}>
      <div className={`${style.membersContainer} myContainer `}>
        <h2>Our Members</h2>

        <div className={`${style.sliderContainer}`}>
          <Slider {...settings}>
            {members.map((member, index) => (
              <div key={index} className={`${style.memberCard} mb-3   d-flex justify-content-center`}>
                <div className={`${style.memberCardWrapper} `}>
                  <div className={style.memberImage}>
                    <img
                      className="w-100"
                      src={member.profilePicture?.secure_url || placeHolderImage}
                      alt={member.name || "Member"}
                      loading="lazy" // Lazy load the images
                    />
                  </div>
                  <div className={style.memberNameAndRole}>
                    <h6>{member.name}</h6>
                    <p>{member.role === "admin" ? "Head" : member.role === "super" ? "Leader" : member.role}</p>
                  </div>
                  <div className={style.memberAccount}>
                    {member.linkedIn && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                        <i className={`${style.linkedInLogo} fa-brands fa-linkedin-in`}></i>
                      </a>
                    )}
                    {member.github && (
                      <a className="" href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                        <i className={`${style.githubLogo} fa-brands fa-github`}></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
